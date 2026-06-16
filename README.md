# MountLift — Agency Website

The marketing site and research hub for MountLift, a data-driven influencer marketing agency. Built with Next.js (App Router), Tailwind CSS, and Framer Motion, with a markdown-driven research/intelligence section.

**Live site:** [mountlift.agency](https://mountlift.agency)

---

## Stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **3D/WebGL background:** custom `Scene` component
- **Content:** Markdown files with frontmatter (via `gray-matter` + `remark`)
- **Icons:** Lucide React
- **Analytics:** Vercel Speed Insights
- **Deployment:** Vercel

---

## Project structure

```
app/
  page.tsx                  Homepage — hero, capabilities, neural engine, ROI simulator
  about-us/page.tsx          Methodology / about page
  influencer-marketing/      Service detail page
  intelligence/
    page.tsx                 Research index (list of posts)
    [slug]/page.tsx           Individual research post (dynamic route)
  privacy/page.tsx           Privacy policy
  globals.css                 Global styles, custom animations, utility classes
  layout.tsx                  Root layout, fonts, metadata

components/
  Scene.tsx                   WebGL background component

content/
  intelligence/                Markdown source files for research posts
    *.md                       One file per post (see Content model below)

lib/
  markdown.ts                  Markdown parsing, reading time, table of contents,
                                related-posts logic
```

---

## Content model — adding a research post

Posts live in `content/intelligence/` as individual `.md` files. The filename (minus `.md`) becomes the post's URL slug, e.g. `content/intelligence/instagram-algorithm-2026.md` → `/intelligence/instagram-algorithm-2026`.

Each file needs frontmatter at the top:

```markdown
---
title: "How Instagram's Ranking Signals Shifted From 2024 to 2026"
date: "2026-06-01"
tag: "Platform Research"
excerpt: "A synthesis of public platform statements and third-party tracking data on what changed — and what it means for campaign strategy."
---

Your markdown content starts here. Standard markdown is supported:
headings, **bold**, links, blockquotes, images, and horizontal rules.

## This becomes a table-of-contents entry automatically

Any `##` or `###` heading is auto-detected and given an anchor link,
so the sidebar table of contents on the post page always matches
what's actually in the post — no manual syncing needed.
```

**Frontmatter fields:**

| Field | Required | Used for |
|---|---|---|
| `title` | Yes | Page `<h1>`, post list, related posts, metadata |
| `date` | Yes | Sorting (newest first) and display |
| `tag` | Yes | Badge styling, related-post matching |
| `excerpt` | Recommended | List-page preview, lede paragraph on the post itself |

**Computed automatically — do not set manually:**
- Reading time (word count ÷ 200 wpm)
- Table of contents (parsed from `##`/`###` headings in your content)
- Related posts (same-tag posts first, falls back to most recent others, capped at 3)

To publish: drop a new `.md` file into `content/intelligence/`, commit, and push. No code changes needed for a standard post.

---

## Editorial / credibility standards for research posts

This section is a deliberate choice, not boilerplate — worth keeping in mind for anyone else writing for it:

- **No fabricated statistics.** We don't have client case studies yet, so no post should present a specific outcome metric (e.g. "98% match accuracy," "4.2x average ROAS") as if it's our measured result. It isn't.
- **Every factual claim needs a real, named source** — a platform statement, a named third-party report, or an attributed quote. If a claim can't be sourced, cut it or rewrite it as our own labeled analysis.
- **Label analysis as analysis.** Sourced facts and our interpretation should be visually/structurally distinguishable in the post (e.g. "Our take:" callouts), so readers can tell what's reported versus what's our opinion.
- **Note disagreement between sources rather than picking the flattering number.** If two trackers report different figures for the same thing, say so.

---

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

```bash
npm run build      # production build
npm run start      # run the production build locally
npm run lint        # lint
```

---

## Environment variables

Currently no required environment variables for core functionality. If Vercel Speed Insights or any future integration needs a key, document it here:

```
# .env.local
# (none required at this time)
```

---

## Deployment

Deployed via **Vercel**, connected directly to this GitHub repository.

- **Production branch:** `main` — pushes to `main` trigger a production deploy automatically.
- **Preview deploys:** any other branch or pull request gets an automatic preview URL from Vercel.
- **Build command:** `next build` (Vercel default, no override needed)
- **Output:** Next.js App Router, server-rendered + static where applicable

To deploy manually instead of via git push, use the Vercel CLI:

```bash
npm install -g vercel
vercel --prod
```

---

## Key pages and routes

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/about-us` | Methodology / about |
| `/influencer-marketing` | Service detail |
| `/intelligence` | Research post index |
| `/intelligence/[slug]` | Individual research post |
| `/privacy` | Privacy policy |

Keep nav links and internal `<Link>` hrefs pointing to the same canonical paths above — a past inconsistency between nav labels and capability-section links was a known issue, so any new section should be added to this table and cross-checked against both the nav and any internal links before merging.

---

## Notes for future contributors / agents

- Tailwind's `@tailwindcss/typography` plugin is required for the `prose` classes used on research post pages — confirm it's installed and registered in the Tailwind config before editing post styling.
- The WebGL `Scene` background is fixed and global — changes to it affect every page that imports the homepage layout pattern.
- Brand voice across the site leans into a "systems / intelligence / algorithm" register (e.g. "Initialize," "System Ready"). If continuing to write copy or CTAs, stay consistent with this voice unless a deliberate rebrand is underway.
