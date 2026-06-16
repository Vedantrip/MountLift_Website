import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/intelligence');

interface PostMeta {
  title: string;
  date: string;
  tag: string;
  excerpt?: string;
  author?: string;
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as PostMeta),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Word-count based reading time. Average adult silent reading speed ~200-230 wpm;
// 200 is used here as a conservative, commonly-cited baseline.
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Extract h2/h3 headings from rendered HTML to build a table of contents.
// Slugs are generated the same way most markdown-to-html pipelines do (lowercase, hyphenated),
// matched against simple anchor injection performed in the same pass.
interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractTocAndInjectIds(htmlString: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const headingRegex = /<h([23])>(.*?)<\/h\1>/g;

  const updatedHtml = htmlString.replace(headingRegex, (match, level, innerText) => {
    const plainText = innerText.replace(/<[^>]*>/g, '');
    const id = slugify(plainText);
    toc.push({ id, text: plainText, level: Number(level) as 2 | 3 });
    return `<h${level} id="${id}">${innerText}</h${level}>`;
  });

  return { html: updatedHtml, toc };
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const rawHtml = processedContent.toString();

  const { html: contentHtml, toc } = extractTocAndInjectIds(rawHtml);
  const readingTime = estimateReadingTime(rawHtml);
  const meta = matterResult.data as PostMeta;

  // Related posts: same tag, excluding the current post, most recent first, capped at 3.
  // Falls back to most recent other posts if fewer than 3 share the tag.
  const allPosts = getSortedPostsData();
  const sameTag = allPosts.filter((p) => p.slug !== slug && p.tag === meta.tag);
  const fallback = allPosts.filter((p) => p.slug !== slug && p.tag !== meta.tag);
  const relatedPosts = [...sameTag, ...fallback].slice(0, 3);

  return {
    slug,
    contentHtml,
    toc,
    readingTime,
    relatedPosts,
    ...meta,
  };
}