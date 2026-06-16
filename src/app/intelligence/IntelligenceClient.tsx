'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ArrowRight, BookOpen, ArrowLeft, TerminalSquare } from 'lucide-react'

interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
}

export default function IntelligenceClient({ posts }: { posts: Post[] }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#00ffcc] selection:text-black noise grid-overlay relative">
      
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[800px] h-[800px] bg-gradient-to-tr from-[#00ffcc]/10 to-[#ff0055]/10 blur-[150px] rounded-full"
        />
      </div>

      {/* Dynamic Terminal Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-xl font-black tracking-tighter text-white uppercase">MT/LFT</span>
            <motion.span
              animate={{ filter: ["brightness(1)", "brightness(2)", "brightness(1)"] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-xl text-[#00ffcc]"
            >
              ⚡️
            </motion.span>
          </Link>
          
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#00ffcc] transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-[#00ffcc]/50 bg-black/50 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminate & Return
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto relative z-10 pt-32 px-6 md:px-12 pb-24">
        
        {/* Animated Header Section */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-[#ff0055]/30 bg-[#ff0055]/10 text-[#ff0055] font-black uppercase text-[10px] tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(255,0,85,0.2)]"
          >
            <Sparkles className="w-3 h-3 animate-pulse" /> MountLift Research Division
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.9]"
          >
            Strategy <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">Briefs.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 mt-8 max-w-xl text-lg font-medium"
          >
            Proprietary market teardowns, data-driven methodology, and blueprints for navigating the current attention economy.
          </motion.p>
        </div>

        {/* Animated Research Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
            >
              <Link href={`/intelligence/${post.slug}`} className="group block h-full">
                <article className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden hover:border-[#00ffcc]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,255,204,0.1)] h-full flex flex-col relative">
                  
                  {/* Dynamic Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ffcc]/0 to-[#00ffcc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Visual Header Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[#111] to-[#050505] flex items-center justify-center border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                    <TerminalSquare className="w-12 h-12 text-white/10 group-hover:text-[#00ffcc]/40 transition-colors group-hover:scale-110 duration-500" />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00ffcc] border border-[#00ffcc]/20 bg-[#00ffcc]/10 px-3 py-1 rounded-full">
                        {post.tag}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">{post.date}</span>
                    </div>
                    
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-4 group-hover:text-[#00ffcc] transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all group-hover:text-[#00ffcc]">
                      Access Research <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Footer Attribution */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-32 pt-10 border-t border-white/10 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest"
        >
          <p>© {new Date().getFullYear()} MountLift Research Division</p>
          <p>CONFIDENTIAL // INTERNAL USE ONLY</p>
        </motion.div>
      </div>
    </main>
  )
}