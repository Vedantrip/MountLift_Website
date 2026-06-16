import { getPostData } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Tag,
  ShieldCheck,
  Clock,
  List,
  ArrowUpRight,
} from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const resolvedParams = await params;

  let postData;

  try {
    postData = await getPostData(resolvedParams.slug);

    if (!postData) {
      return notFound();
    }
  } catch (error) {
    return notFound();
  }

  const { toc, readingTime, relatedPosts, excerpt } = postData;
  const hasToc = toc && toc.length > 1;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-24 px-4 md:px-8 noise grid-overlay relative">

      {/* Ambient glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#00ffcc]/4 blur-[140px] rounded-full" />
        <div className="absolute bottom-[5%] right-[10%] w-[450px] h-[450px] bg-[#9900ff]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Back link */}
        <div className="mb-12">
          <Link
            href="/intelligence"
            className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#00ffcc] transition-colors duration-300 border border-white/10 px-5 py-2.5 rounded-full bg-black/50 backdrop-blur-md hover:border-[#00ffcc]/30"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Return to Briefs
          </Link>
        </div>

        {/* Header */}
        <header className="border-b border-white/10 pb-10 mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#00ffcc] border border-[#00ffcc]/20 bg-[#00ffcc]/10 px-3 py-1.5 rounded-full">
              <Tag className="w-3 h-3" /> {postData.tag}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <Calendar className="w-3 h-3" /> {postData.date}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
              <Clock className="w-3 h-3" /> {readingTime} min read
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-wider ml-auto">
              <ShieldCheck className="w-3 h-3 text-[#00ffcc]/60" /> Verified Intel
            </span>
          </div>

          <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-6">
            {postData.title}
          </h1>

          {excerpt && (
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed max-w-2xl border-l-2 border-[#00ffcc]/30 pl-5">
              {excerpt}
            </p>
          )}
        </header>

        <div className="md:grid md:grid-cols-[1fr_220px] md:gap-12 items-start">

          {/* Article body */}
          <article
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            className="prose prose-invert max-w-none order-2 md:order-1
              prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-32
              prose-h2:text-2xl prose-h2:md:text-4xl prose-h2:border-t prose-h2:border-white/5 prose-h2:pt-10 prose-h2:mt-12
              prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:text-[#00ffcc]/90
              prose-p:text-gray-300 prose-p:text-base prose-p:md:text-lg prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-[#00ffcc] prose-strong:font-black
              prose-a:text-[#00ffcc] prose-a:no-underline prose-a:border-b prose-a:border-[#00ffcc]/30 hover:prose-a:border-[#00ffcc] prose-a:transition-colors
              prose-li:text-gray-300 prose-li:text-base prose-li:md:text-lg
              prose-blockquote:border-l-4 prose-blockquote:border-[#ff0055] prose-blockquote:bg-[#ff0055]/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:my-10 prose-img:w-full
              prose-hr:border-white/10 prose-hr:my-12
              prose-code:text-[#00ffcc] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
          />

          {/* Sticky table of contents — desktop only, hidden entirely if too few headings */}
          {hasToc && (
            <aside className="hidden md:block order-1 md:order-2 sticky top-32 self-start">
              <div className="border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md p-5">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <List className="w-3.5 h-3.5" />
                  On this page
                </div>
                <nav className="flex flex-col gap-3">
                  {toc.map((entry) => (
                    <a
                      key={entry.id}
                      href={`#${entry.id}`}
                      className={`text-xs leading-snug text-gray-400 hover:text-[#00ffcc] transition-colors duration-200 ${
                        entry.level === 3 ? 'pl-3 border-l border-white/10' : 'font-medium'
                      }`}
                    >
                      {entry.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>

        {/* Attribution strip */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest font-mono">
          <p>MountLift Security Clearance Required</p>
          <p>Document Stream // Dynamic Node Secured</p>
        </div>

        {/* Related posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                // Continue Reading
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/intelligence/${post.slug}`}
                  className="group border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00ffcc]/30 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
                >
                  <div>
                    <span className="inline-flex items-center text-[9px] font-black uppercase tracking-widest text-[#00ffcc]/70 border border-[#00ffcc]/15 bg-[#00ffcc]/5 px-2.5 py-1 rounded-full mb-4">
                      {post.tag}
                    </span>
                    <h3 className="text-base font-bold uppercase tracking-tight text-white leading-snug group-hover:text-[#00ffcc] transition-colors duration-300">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-[10px] font-mono text-gray-500">{post.date}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#00ffcc] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <div className="mt-20 border border-white/10 rounded-3xl p-10 md:p-12 bg-gradient-to-br from-white/[0.03] to-transparent text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[#00ffcc]/40 to-transparent" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Want this applied to your brand?
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            We turn research like this into creator briefs and campaign architecture. No fabricated case studies — just a clear-eyed read on what's actually working right now.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#00ffcc] transition-colors duration-300"
          >
            Request a Briefing
          </Link>
        </div>

      </div>
    </main>
  );
}