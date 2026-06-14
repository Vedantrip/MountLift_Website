"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Scene from "@/components/Scene"; // Your WebGL physics component
import { ArrowUpRight, BrainCircuit, Activity, Code2, Sparkles, Fingerprint, Coins, Target, AlertTriangle, TerminalSquare } from "lucide-react";

export default function MountLiftAdvanced() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // State for the interactive ROI Simulator
  const [budget, setBudget] = useState(10000);

  const [terminalStep, setTerminalStep] = useState(0);
  
  const terminalLogs = [
    [
      "> INITIALIZING NEURAL MATCHING...",
      "[SYSTEM] Analyzing 2.4M creator data points",
      "> EXTRACTING ENGAGEMENT VECTORS",
      "[WARN] High variance detected in target demographic",
      "> RECALIBRATING PREDICTION MODEL",
      "MATCH FOUND: 98.4% ALIGNMENT"
    ],
    [
      "> RECALIBRATING TARGET MATRIX...",
      "[SYSTEM] Injecting viral coefficient logic",
      "> SIMULATING HOOK RETENTION...",
      "[SUCCESS] +14.2% lift in projected watch time",
      "> COMPILING ASSET REQUIREMENTS",
      "ARCHITECTURE LOCKED. READY TO DEPLOY."
    ],
    [
      "> SCANNING PLATFORM ALGORITHMS...",
      "[SYSTEM] TikTok v4.2 // IG Reels v8.1 detected",
      "> IDENTIFYING ARBITRAGE OPPORTUNITIES",
      "[SUCCESS] Discovered undervalued CPM sectors",
      "> ROUTING CAPITAL PIPELINE",
      "STRATEGY OPTIMIZED: MAXIMUM LIFT ACQUIRED."
    ]
  ];

  return (
    <main className="relative min-h-screen selection:bg-[#00ffcc] selection:text-black text-white bg-transparent">
      
      {/* 1. FIXED WEBGL BACKGROUND */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <Scene />
      </div>

      {/* 2. DYNAMIC ISLAND NAVIGATION */}
      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
        className="fixed top-6 left-1/2 z-[100] flex items-center gap-4 md:gap-8 px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      >
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-xl font-black tracking-tighter text-white">MT/LFT</span>
          <motion.span
            animate={{ 
              scale: [1, 1.3, 1], 
              rotate: [0, 15, -5, 0],
              filter: ["brightness(1)", "brightness(1.8)", "brightness(1)"]
            }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-xl text-[#ff5500] drop-shadow-[0_0_15px_rgba(255,85,0,0.8)]"
          >
            ⚡️
          </motion.span>
        </Link>

        <div className="w-px h-4 bg-white/20 hidden md:block" />

        <div className="hidden md:flex items-center gap-6">
          <Link href="/about-us" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Methodology
          </Link>
          <Link href="/intelligence" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#00ffcc] transition-colors">
            Intelligence
          </Link>
        </div>
        
        <div className="w-px h-4 bg-white/20" />

        <Link 
          href="#contact" 
          className="px-5 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#ff0055] hover:text-white transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Initialize
        </Link>
      </motion.nav>

      {/* 3. KINETIC HERO SECTION */}
      <section className="relative h-screen flex flex-col justify-center items-center pointer-events-none z-10 px-4 overflow-hidden">
        <motion.div 
          style={{ y: yHeroText, opacity: opacityHero }} 
          className="text-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.2 }}
            className="relative bg-[#ff0055]/10 border border-[#ff0055]/50 text-[#ff0055] backdrop-blur-md px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm mb-8 inline-flex items-center gap-2 pointer-events-auto overflow-hidden group shadow-[0_0_30px_rgba(255,0,85,0.3)]"
          >
            <motion.span 
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🔥
            </motion.span>
            We break algorithms.
            <motion.div 
              className="absolute top-0 left-0 w-[50%] h-full bg-white/20 skew-x-12"
              animate={{ x: ['-200%', '300%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1 }}
            />
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
            }}
            className="text-[14vw] md:text-[10vw] leading-[0.8] font-black uppercase mix-blend-difference perspective-1000 flex flex-col items-center"
          >
            <span className="flex justify-center overflow-hidden py-2">
              {"GO VIRAL.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 150, rotateX: -90 },
                    visible: { 
                      opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } 
                    }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <span className="flex justify-center overflow-hidden py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#ff0055] stroke-white stroke-2 pointer-events-auto">
              {"OR GO HOME.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 150, rotateX: -90 },
                    visible: { 
                      opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } 
                    }
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotateZ: (i % 2 === 0 ? 8 : -8), 
                    color: "#ffffff",
                    textShadow: "0px 0px 20px rgba(255,255,255,0.8)"
                  }}
                  className="inline-block cursor-crosshair transition-colors duration-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>
      </section>
      
      {/* 4. THE VANGUARD */}
      <div className="relative z-10 w-full overflow-hidden flex border-y border-white/10 py-6 bg-black/40 backdrop-blur-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex gap-16 whitespace-nowrap text-3xl font-black uppercase tracking-widest text-white/30"
        >
          {Array(6).fill("SYSTEM STABLE // ALGORITHM MAPPED // INFLUENCE SCALED // METRICS LOCKED // ").map((text, i) => (
            <span key={i} className="hover:text-white transition-colors cursor-default">{text}</span>
          ))}
        </motion.div>
      </div>

      {/* 5. THE MANIFESTO QUOTE */}
      <section className="relative z-10 py-32 px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="card-glass rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#ff0055]/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#00ffcc]/10 blur-[100px] rounded-full pointer-events-none" />

          <span className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff0055] to-transparent opacity-30 block mb-2 select-none leading-none">
            “
          </span>
          
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto mix-blend-difference">
            Algorithms control the distribution of <span className="text-gray-500">data</span>, but human resonance controls the distribution of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#9900ff] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">attention</span>.
          </h2>

          <div className="w-12 h-px bg-white/20 mx-auto my-8 md:my-10" />

          <p className="text-[10px] font-bold uppercase tracking-widest text-[#ff0055]">
            — The Attention Architecture Manifesto
          </p>
        </motion.div>
      </section>

      {/* 6. CONCEPT DROPS & VULNERABILITY (Zero-Client Proof) */}
      <section className="relative z-10 pb-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Predictive<br/>Intelligence.</h2>
          <p className="text-xl text-gray-400 max-w-xl">We don't rely on outdated case studies. We build predictive campaign blueprints designed to exploit current algorithm vulnerabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          
          {/* Blueprint 1: The Teardown */}
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#111] to-[#000] border border-white/10 rounded-3xl p-8 flex flex-col justify-end hover:border-[#ff0055]/50 transition-colors group relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
              <AlertTriangle className="w-24 h-24 text-[#ff0055]" />
            </div>
            <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start">
               <span className="text-[#ff0055] font-mono text-xs uppercase animate-pulse">System Warning</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Algorithm<br/>Deficit.</h3>
            <p className="text-lg text-gray-400 font-medium">90% of brands waste ad spend on ghost engagement. We map algorithmic friction points and bypass feed suppression before deploying a single dollar.</p>
          </div>

          {/* Blueprint 2: Concept Architecture */}
          <div className="md:col-span-2 bg-[#111]/80 border border-white/10 rounded-3xl p-8 hover:bg-[#00ffcc] hover:text-black transition-colors group backdrop-blur-xl flex flex-col justify-between">
            <TerminalSquare className="w-8 h-8 text-[#00ffcc] group-hover:text-black transition-colors" />
            <div>
              <p className="text-sm font-mono uppercase mb-2 opacity-70">Architecture: Concept_01</p>
              <h4 className="text-2xl font-black uppercase mb-1">High-Velocity Seeding</h4>
              <p className="text-gray-400 group-hover:text-black/80 font-medium">Simulated deploy of 500+ micro-creators to monopolize share-of-voice within 48 hours.</p>
            </div>
          </div>

          {/* Simulated Metric */}
          <div className="md:col-span-1 bg-[#111]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-5xl font-black text-[#9900ff] mb-2">98.4%</h3>
            <p className="text-sm text-gray-400 uppercase tracking-wider">Demographic Match Accuracy</p>
          </div>

          {/* Action Card */}
          <Link href="#contact" className="md:col-span-1 bg-white text-black rounded-3xl p-8 flex flex-col justify-between hover:rotate-2 transition-transform cursor-pointer group">
            <ArrowUpRight className="w-10 h-10 self-end group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <h4 className="text-2xl font-black uppercase">Request<br/>Blueprint</h4>
          </Link>
        </div>
      </section>

      {/* 7. CORE ARCHITECTURES */}
      <section className="relative z-10 py-32 border-t border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
             <Fingerprint className="w-12 h-12 text-[#9900ff] mb-6" />
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Capabilities.</h2>
          </div>
          
          <div className="flex flex-col border-t border-white/10">
            {[
              { id: "01", title: "Viral Seeding", color: "hover:text-[#ff0055]", link: "/intelligence" },
              { id: "02", title: "Creator Acquisition", color: "hover:text-[#00ffcc]", link: "/influencer-marketing" },
              { id: "03", title: "Content Architecture", color: "hover:text-[#9900ff]", link: "/influencer-marketing" },
              { id: "04", title: "Conversion Tracking", color: "hover:text-[#ffcc00]", link: "/influencer-marketing" }
            ].map((service, i) => (
              <Link href={service.link} key={i} className="group border-b border-white/10 py-10 flex items-baseline gap-8 cursor-pointer relative overflow-hidden">
                <span className="text-2xl font-bold text-gray-600 group-hover:text-white transition-colors">{service.id}</span>
                <h3 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-400 ${service.color} transition-colors duration-300 relative z-10`}>
                  {service.title}
                </h3>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE NEURAL ENGINE (Interactive Terminal) */}
      <section className="relative z-10 py-32 border-t border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#9900ff]/20 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9900ff]/50 bg-[#9900ff]/10 text-[#9900ff] font-bold uppercase tracking-widest text-xs mb-8">
              <BrainCircuit className="w-4 h-4" /> Proprietary Intelligence
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
              Matched by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9900ff] to-[#00ffcc]">Neural Networks.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              We don't scroll through feeds to find creators. Our custom AI visualizer maps audience psychographics, cross-referencing brand DNA with creator engagement patterns to predict campaign success before a single dollar is spent.
            </p>
            
            <button 
              onClick={() => setTerminalStep((prev) => (prev + 1) % terminalLogs.length)}
              className="px-6 py-3 bg-white/5 border border-white/20 hover:border-[#00ffcc] hover:bg-[#00ffcc]/10 transition-all rounded-lg font-mono text-sm text-white flex items-center gap-3 active:scale-95"
            >
              <Code2 className="w-4 h-4 text-[#00ffcc]" /> 
              Run Next Simulation
            </button>
          </div>

          <div className="md:w-1/2 w-full aspect-square md:aspect-auto md:h-[500px] bg-[#0a0a0a] rounded-3xl border border-white/10 p-6 flex flex-col shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9900ff] to-[#00ffcc]" />
             
             {/* Terminal Header */}
             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <span className="text-[10px] font-mono text-gray-500">MTLFT_CORE_v2.0.sh</span>
             </div>

             {/* Interactive Terminal Output */}
             <div className="font-mono text-sm text-[#00ffcc] opacity-90 leading-relaxed flex-grow flex flex-col gap-3">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={terminalStep}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="flex flex-col gap-3"
                 >
                   {terminalLogs[terminalStep].map((log, index) => (
                     <p 
                       key={index} 
                       className={`${log.includes('[WARN]') ? 'text-[#ff0055]' : log.includes('MATCH') || log.includes('LOCKED') || log.includes('OPTIMIZED') ? 'text-white font-bold bg-white/10 p-2 rounded' : 'text-gray-400'}`}
                     >
                       {log.startsWith('>') ? <span className="text-[#00ffcc]">{log}</span> : log}
                     </p>
                   ))}
                 </motion.div>
               </AnimatePresence>
               <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-3 h-5 bg-[#00ffcc] mt-2 inline-block" />
             </div>
          </div>
        </div>
      </section>

      {/* 9. THE LIFT SIMULATOR */}
      <section className="relative z-10 py-32 border-t border-white/10 bg-[#0a0a0a] overflow-hidden">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] rounded-full opacity-20 pointer-events-none transition-colors duration-700"
          style={{ 
            backgroundColor: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' 
          }}
        />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Coins className="w-16 h-16 text-white mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Simulate Your Lift.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Adjust your monthly creator budget to see projected campaign architectures, asset deliverables, and algorithmic impact based on our live dataset.</p>
          </div>
          
          <div className="bg-[#111]/80 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div className="w-full md:w-2/3">
                <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">
                  <span>Target Allocation</span>
                  <motion.span 
                    key={budget}
                    initial={{ opacity: 0.5, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-2xl"
                  >
                    ${budget.toLocaleString()}
                  </motion.span>
                </div>
                
                <div className="relative w-full h-8 flex items-center group">
                  <div className="absolute w-full h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <motion.div 
                      className="h-full rounded-full"
                      animate={{ 
                        width: `${((budget - 5000) / 95000) * 100}%`,
                        backgroundColor: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' 
                      }}
                      transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                    />
                  </div>

                  <motion.div 
                    className="absolute w-8 h-8 bg-white rounded-full z-10 pointer-events-none flex items-center justify-center"
                    animate={{ 
                      left: `calc(${((budget - 5000) / 95000) * 100}% - 16px)`,
                      boxShadow: `0 0 25px ${budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055'}`,
                      border: `4px solid ${budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055'}`
                    }}
                    transition={{ type: "spring", bounce: 0, duration: 0.2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-black" />
                  </motion.div>

                  <input 
                    type="range" 
                    min="5000" 
                    max="100000" 
                    step="1000" 
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                  />
                </div>
              </div>

              <div className="w-full md:w-auto flex justify-end">
                <div className={`px-6 py-3 rounded-full border border-white/20 flex flex-col items-end transition-colors duration-500 bg-white/5`}>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Architecture Level</span>
                  <span 
                    className="text-2xl font-black uppercase tracking-widest transition-colors duration-500"
                    style={{ color: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' }}
                  >
                    {budget < 20000 ? 'Seeding' : budget < 60000 ? 'Scaling' : 'Domination'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <Activity className="w-3 h-3" /> Est. Reach Cap
                </p>
                <p className="text-4xl md:text-5xl font-black text-white">
                  {budget < 20000 
                    ? (budget * 45 / 1000).toFixed(0) + 'K' 
                    : (budget * (budget < 60000 ? 55 : 75) / 1000000).toFixed(1) + 'M'}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Target Clicks (2.1%)
                </p>
                <p className="text-4xl md:text-5xl font-black text-white">
                  {((budget * (budget < 20000 ? 45 : budget < 60000 ? 55 : 75)) * 0.021).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> UGC Pipeline
                </p>
                <p className="text-4xl md:text-5xl font-black text-white">
                  {Math.floor(budget / (budget < 20000 ? 800 : 1200))}
                  <span className="text-xl text-gray-600 font-medium"> pcs</span>
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
                  <ArrowUpRight className="w-3 h-3" /> Projected ROAS
                </p>
                <p 
                  className="text-4xl md:text-5xl font-black transition-colors duration-500"
                  style={{ color: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' }}
                >
                  {budget < 20000 ? '2.8x' : budget < 60000 ? '4.2x' : '6.5x'}
                </p>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
              <Link 
                href="/contact"
                className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] inline-block"
              >
                {budget < 20000 ? 'Initialize Briefing' : 'Deploy Architecture'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. BRUTALIST FOOTER */}
      <footer id="contact" className="relative z-10 bg-black pt-32 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <h2 className="text-[10vw] md:text-[8vw] leading-[0.8] font-black uppercase tracking-tighter text-white">
            System<br/>Ready.
          </h2>
          <div className="flex flex-col gap-4">
            <a href="mailto:hello@mountlift.agency" className="text-2xl md:text-4xl font-bold hover:text-[#ff0055] transition-colors underline decoration-2 underline-offset-8">
              hello@mountlift.agency
            </a>
            <div className="flex gap-6 mt-4">
              <Link href="https://instagram.com" target="_blank" className="font-bold uppercase tracking-widest text-sm hover:text-[#00ffcc] transition-colors">Instagram</Link>
              <Link href="https://www.linkedin.com/company/mountlift-agency" target="_blank" className="font-bold uppercase tracking-widest text-sm hover:text-[#00ffcc] transition-colors">LinkedIn</Link>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex justify-between items-center pt-8 border-t border-white/20 text-xs font-bold uppercase tracking-widest text-gray-500">
          <p>© 2026 MountLift Agency</p>
          <p>Built differently.</p>
        </div>
      </footer>

    </main>
  );
}