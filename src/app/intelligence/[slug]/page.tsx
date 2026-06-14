import { getPostData } from '@/lib/markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 noise">
      <article className="max-w-3xl mx-auto relative z-10">
        
        <Link href="/intelligence" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-[#00ffcc] transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Return to Logs
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-[#ff0055] mb-6">
            <span>{postData.date}</span>
            <span>///</span>
            <span>{postData.tag}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-8">
            {postData.title}
          </h1>
        </header>

        {/* Brutalist Markdown Render Container */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-[#00ffcc] prose-a:no-underline hover:prose-a:underline prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        
      </article>
    </main>
  );
}