import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function IntelligenceFeed() {
  const posts = getSortedPostsData();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 border border-[#ff0055]/30 bg-[#ff0055]/10 text-[#ff0055] font-black uppercase text-[10px] tracking-[0.2em] px-4 py-1.5 rounded-full mb-6">
            <Sparkles className="w-3 h-3" /> MountLift Research Division
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9]">
            Strategy <br/> <span className="text-gray-600">Briefs.</span>
          </h1>
          <p className="text-gray-400 mt-8 max-w-xl text-lg font-medium">
            Proprietary market teardowns, data-driven methodology, and blueprints for navigating the current attention economy.
          </p>
        </div>

        {/* Research Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/intelligence/${post.slug}`} key={post.slug} className="group">
              <article className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden hover:border-[#00ffcc]/30 transition-all duration-500 hover:-translate-y-2">
                
                {/* Visual Header - Place for Pie Charts/Images */}
                <div className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center border-b border-white/5">
                  <BookOpen className="w-12 h-12 text-white/10 group-hover:text-[#00ffcc]/30 transition-colors" />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#00ffcc] bg-[#00ffcc]/10 px-3 py-1 rounded-full">
                      {post.tag}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-[#00ffcc] transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
                    Access Research <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Footer Attribution */}
        <div className="mt-32 py-10 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <p>© 2026 MountLift Research Division</p>
          <p>CONFIDENTIAL // INTERNAL USE ONLY</p>
        </div>
      </div>
    </main>
  );
}