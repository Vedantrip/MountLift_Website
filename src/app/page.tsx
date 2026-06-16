'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Target, Users, TrendingUp, Globe, Instagram, Linkedin, BarChart3, ShieldAlert, Cpu, Network, Sparkles, Zap, ArrowUpRight, TerminalSquare, AlertTriangle, Fingerprint, BrainCircuit, Code2, Coins, Activity } from 'lucide-react'
import Link from 'next/link'
import Scene from "@/components/Scene" // Ensure this path matches your WebGL component

// --- UTILITIES ---

const Magnetic = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    x.set(middleX * 0.3)
    y.set(middleY * 0.3)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const AnimatedLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-1 group shrink-0">
      <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase">MT/LFT</span>
      <motion.span
        animate={{ 
          scale: [1, 1.4, 1], 
          rotate: [0, 15, -5, 0],
          filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-lg md:text-xl text-[#ff0055] drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]"
      >
        ⚡️
      </motion.span>
    </Link>
  )
}

export default function MountLiftHome() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  
  const [budget, setBudget] = useState(10000);
  const [terminalStep, setTerminalStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const terminalLogs = [
    [
      "> INITIALIZING NEURAL MATCHING...",
      "[SYSTEM] Analyzing creator data points",
      "> EXTRACTING ENGAGEMENT VECTORS",
      "[WARN] High variance detected",
      "> RECALIBRATING MODEL",
      "[SYSTEM] ALIGNMENT VERIFIED"
    ],
    [
      "> RECALIBRATING TARGET MATRIX...",
      "[SYSTEM] Injecting viral logic",
      "> SIMULATING HOOK RETENTION...",
      "[SYSTEM] RETENTION METRICS OPTIMIZED",
      "> COMPILING ASSETS",
      "ARCHITECTURE LOCKED."
    ]
  ];

  return (
    <main className="relative min-h-screen selection:bg-[#00ffcc] selection:text-black text-white bg-transparent overflow-x-hidden">
      
      {/* 1. FIXED WEBGL BACKGROUND */}
      <div className="fixed inset-0 w-full h-full -z-20">
        <Scene />
      </div>

      {/* 2. DYNAMIC ISLAND NAVIGATION */}
      <motion.nav 
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300, delay: 0.2 }}
        className={`fixed top-4 md:top-6 left-1/2 z-[100] w-[90%] md:w-auto max-w-fit flex items-center justify-between md:justify-center gap-4 md:gap-8 px-4 md:px-6 py-2 md:py-3 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent border border-transparent'}`}
      >
        <AnimatedLogo />

        <div className="w-px h-4 bg-white/20 hidden md:block" />

        <div className="hidden md:flex items-center gap-6">
          <Link href="/about-us" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
            Methodology
          </Link>
          <Link href="/intelligence" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#00ffcc] transition-colors">
            Intelligence
          </Link>
        </div>
        
        <div className="w-px h-4 bg-white/20 hidden md:block" />

        <Link 
          href="/contact" 
          className="px-4 md:px-5 py-2 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#ff0055] hover:text-white transition-colors shrink-0"
        >
          INITIALIZE BRIEFING
        </Link>
      </motion.nav>

      {/* 3. KINETIC HERO SECTION */}
      <section className="relative h-[100svh] flex flex-col justify-center items-center pointer-events-none z-10 px-4 w-full overflow-hidden">
        <motion.div 
          style={{ y: yHeroText, opacity: opacityHero }} 
          className="text-center w-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-[#ff0055]/10 border border-[#ff0055]/50 text-[#ff0055] backdrop-blur-md px-4 md:px-6 py-2 rounded-full font-black uppercase tracking-widest text-[10px] md:text-sm mb-6 md:mb-8 inline-flex items-center gap-2 pointer-events-auto overflow-hidden group shadow-[0_0_30px_rgba(255,0,85,0.3)] mx-auto max-w-full"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              🔥
            </motion.span>
            <span className="truncate">We break algorithms.</span>
          </motion.div>

          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
            className="text-[18vw] md:text-[10vw] leading-[0.8] font-black uppercase mix-blend-difference flex flex-col items-center w-full perspective-1000"
          >
            <span className="flex justify-center overflow-hidden py-1 md:py-2">
              {"GO VIRAL.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 150, rotateX: -90 },
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </span>
            <span className="flex justify-center overflow-hidden py-1 md:py-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#ff0055] stroke-white stroke-2 pointer-events-auto">
              {"OR GO HOME.".split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 150, rotateX: -90 },
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", damping: 12, stiffness: 100 } }
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

      {/* 4. HYPER-SPEED MARQUEE */}
      <div className="bg-[#ff0055] py-4 overflow-hidden relative z-20 border-y border-white/20 transform -skew-y-2 translate-y-12 shadow-[0_10px_30px_rgba(255,0,85,0.3)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-6 text-xl md:text-2xl font-black uppercase tracking-tighter flex items-center gap-6 text-black">
              Strategy <span className="text-white">✕</span> Execution <span className="text-white">✕</span> Telemetry <span className="text-white">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* 5. THE MANIFESTO QUOTE */}
      <section className="relative z-10 py-32 md:py-40 px-4 md:px-6 max-w-5xl mx-auto w-full mt-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="card-glass rounded-[2rem] p-8 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-60 h-60 md:w-80 md:h-80 bg-[#ff0055]/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 md:w-80 md:h-80 bg-[#00ffcc]/10 blur-[80px] rounded-full pointer-events-none" />

          <span className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff0055] to-transparent opacity-30 block mb-2 select-none leading-none">
            “
          </span>
          
          <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight max-w-4xl mx-auto mix-blend-difference">
            Algorithms control the distribution of <span className="text-gray-500">data</span>, but human resonance controls the distribution of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#9900ff] drop-shadow-[0_0_15px_rgba(0,255,204,0.3)]">attention</span>.
          </h2>

          <div className="w-12 h-px bg-white/20 mx-auto my-6 md:my-10" />

          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-[#ff0055]">
            — The Attention Architecture Manifesto
          </p>
        </motion.div>
      </section>

      {/* 6. CONCEPT DROPS & VULNERABILITY (Audited Version) */}
      <section className="relative z-10 pb-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4">Predictive<br/>Intelligence.</h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl">We don't rely on outdated case studies. We build predictive campaign blueprints designed to exploit current algorithm vulnerabilities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px]">
          
          <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#111] to-[#000] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col justify-end hover:border-[#ff0055]/50 transition-colors group relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
              <AlertTriangle className="w-16 h-16 md:w-24 md:h-24 text-[#ff0055]" />
            </div>
            <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-start">
               <span className="text-[#ff0055] font-mono text-[10px] md:text-xs uppercase animate-pulse">System Warning</span>
            </div>
            <h3 className="text-3xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none">Algorithm<br/>Deficit.</h3>
            <p className="text-sm md:text-lg text-gray-400 font-medium mb-4">19.2% of total influencer marketing spend reaches audiences that do not actually exist. We map algorithmic friction points to bypass this waste before deploying a single dollar.</p>
            <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest font-mono">* Source: SociaVault Labs, 2026</span>
          </div>

          <div className="md:col-span-2 bg-[#111]/80 border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-[#00ffcc] hover:text-black transition-colors group backdrop-blur-xl flex flex-col justify-between">
            <TerminalSquare className="w-8 h-8 text-[#00ffcc] group-hover:text-black transition-colors" />
            <div>
              <p className="text-xs md:text-sm font-mono uppercase mb-2 opacity-70">Architecture: Strategic Seeding</p>
              <h4 className="text-xl md:text-2xl font-black uppercase mb-1">High-Velocity Deployment</h4>
              <p className="text-sm md:text-base text-gray-400 group-hover:text-black/80 font-medium">Architecting targeted micro-creator bursts to monopolize share-of-voice within 48 hours.</p>
            </div>
          </div>

          <div className="md:col-span-1 bg-[#111]/80 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-3xl md:text-4xl font-black text-[#9900ff] mb-2 uppercase">Rigorous</h3>
            <p className="text-[10px] md:text-sm text-gray-400 uppercase tracking-wider mb-2 font-bold">Audience Mapping</p>
            <p className="text-[10px] md:text-xs text-gray-500 font-medium">Cross-referencing overlap, authenticity, and content-fit.</p>
          </div>

          <Link href="/contact" className="md:col-span-1 bg-white text-black rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:rotate-2 transition-transform cursor-pointer group">
            <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10 self-end group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <h4 className="text-xl md:text-2xl font-black uppercase">INITIALIZE<br/>BRIEFING</h4>
          </Link>
        </div>
      </section>

      {/* 7. CORE ARCHITECTURES (Capabilities) */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="mb-12 md:mb-20">
             <Fingerprint className="w-10 h-10 md:w-12 md:h-12 text-[#9900ff] mb-4 md:mb-6" />
             <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Capabilities.</h2>
          </div>
          
          <div className="flex flex-col border-t border-white/10">
            {[
              { id: "01", title: "Viral Seeding", color: "hover:text-[#ff0055]", link: "/about-us" },
              { id: "02", title: "Creator Acquisition", color: "hover:text-[#00ffcc]", link: "/about-us" },
              { id: "03", title: "Content Architecture", color: "hover:text-[#9900ff]", link: "/about-us" },
              { id: "04", title: "Conversion Tracking", color: "hover:text-[#ffcc00]", link: "/about-us" }
            ].map((service, i) => (
              <Link href={service.link} key={i} className="group border-b border-white/10 py-8 md:py-10 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 cursor-pointer relative overflow-hidden">
                <span className="text-lg md:text-2xl font-bold text-gray-600 group-hover:text-white transition-colors relative z-10">{service.id}</span>
                <h3 className={`text-3xl md:text-7xl font-black uppercase tracking-tighter text-gray-400 ${service.color} transition-colors duration-300 relative z-10`}>
                  {service.title}
                </h3>
                <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out -z-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. THE NEURAL ENGINE (Proprietary Intelligence Terminal) */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/10 bg-black/80 backdrop-blur-3xl overflow-hidden w-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] bg-[#9900ff]/20 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16 w-full">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-[#9900ff]/50 bg-[#9900ff]/10 text-[#9900ff] font-bold uppercase tracking-widest text-[10px] md:text-xs mb-6 md:mb-8">
              <BrainCircuit className="w-3 h-3 md:w-4 md:h-4" /> Proprietary Intelligence
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6 leading-tight">
              Matched by <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9900ff] to-[#00ffcc]">Neural Networks.</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed">
              We don't scroll through feeds to find creators. Our custom AI visualizer maps audience psychographics, cross-referencing brand DNA to predict campaign success before a single dollar is spent.
            </p>
            
            <button 
              onClick={() => setTerminalStep((prev) => (prev + 1) % terminalLogs.length)}
              className="w-full md:w-auto px-6 py-3 bg-white/5 border border-white/20 hover:border-[#00ffcc] hover:bg-[#00ffcc]/10 transition-all rounded-lg font-mono text-xs md:text-sm text-white flex items-center justify-center gap-3 active:scale-95"
            >
              <Code2 className="w-4 h-4 text-[#00ffcc]" /> 
              Run Next Simulation
            </button>
          </div>

          <div className="w-full md:w-1/2 h-[350px] md:h-[500px] bg-[#0a0a0a] rounded-2xl md:rounded-3xl border border-white/10 p-4 md:p-6 flex flex-col shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9900ff] to-[#00ffcc]" />
             
             <div className="flex justify-between items-center mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4">
               <div className="flex gap-1.5 md:gap-2">
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                 <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
               </div>
               <span className="text-[9px] md:text-[10px] font-mono text-gray-500 truncate ml-2">MTLFT_CORE_v2.0</span>
             </div>

             <div className="font-mono text-xs md:text-sm text-[#00ffcc] opacity-90 leading-relaxed flex-grow flex flex-col gap-2 md:gap-3 overflow-y-auto no-scrollbar">
               <AnimatePresence mode="wait">
                 <motion.div 
                   key={terminalStep}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="flex flex-col gap-2 md:gap-3"
                 >
                   {terminalLogs[terminalStep].map((log, index) => (
                     <p 
                       key={index} 
                       className={`${log.includes('[WARN]') ? 'text-[#ff0055]' : log.includes('MATCH') || log.includes('LOCKED') || log.includes('VERIFIED') || log.includes('OPTIMIZED') ? 'text-white font-bold bg-white/10 p-1 md:p-2 rounded break-words' : 'text-gray-400 break-words'}`}
                     >
                       {log.startsWith('>') ? <span className="text-[#00ffcc]">{log}</span> : log}
                     </p>
                   ))}
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* 9. THE LIFT SIMULATOR */}
      <section className="relative z-10 py-20 md:py-32 border-t border-white/10 bg-[#0a0a0a] overflow-hidden w-full">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[600px] md:h-[600px] blur-[100px] md:blur-[150px] rounded-full opacity-20 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' }}
        />

        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="text-center mb-10 md:mb-16">
            <Coins className="w-12 h-12 md:w-16 md:h-16 text-white mx-auto mb-6 md:mb-8 opacity-50" />
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-6">Simulate Your Lift.</h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">Adjust your monthly creator budget to see projected campaign architectures and algorithmic impact.</p>
          </div>
          
          <div className="bg-[#111]/80 border border-white/10 rounded-2xl md:rounded-[2rem] p-6 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 gap-6 md:gap-8">
              
              <div className="w-full md:w-2/3">
                <div className="flex justify-between text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 md:mb-6">
                  <span>Target Allocation</span>
                  <span className="text-white text-lg md:text-2xl font-black">
                    ${budget.toLocaleString()}
                  </span>
                </div>
                
                {/* ZERO-LAG BUTTER-SMOOTH SLIDER WRAPPER */}
                <div className="relative w-full h-6 md:h-8 flex items-center group">
                  <div className="absolute w-full h-2 md:h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                    {/* Width updates instantly (no lag), only background-color transitions smoothly */}
                    <div 
                      className="h-full rounded-full transition-colors duration-500 ease-out"
                      style={{ 
                        width: `${((budget - 5000) / 95000) * 100}%`,
                        backgroundColor: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' 
                      }}
                    />
                  </div>

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

              <div className="w-full md:w-auto flex justify-start md:justify-end">
                <div className="px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/20 flex flex-col items-start md:items-end bg-white/5 w-full md:w-auto">
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Architecture Level</span>
                  <span 
                    className="text-lg md:text-2xl font-black uppercase tracking-widest transition-colors duration-500"
                    style={{ color: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' }}
                  >
                    {budget < 20000 ? 'Seeding' : budget < 60000 ? 'Scaling' : 'Domination'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t border-white/10 pt-8 md:pt-10">
              <div className="flex flex-col">
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1 md:gap-2">
                  <Activity className="w-3 h-3 hidden md:block" /> EST. REACH
                </p>
                <p className="text-2xl md:text-5xl font-black text-white">
                  {budget < 20000 ? (budget * 45 / 1000).toFixed(0) + 'K' : (budget * (budget < 60000 ? 55 : 75) / 1000000).toFixed(1) + 'M'}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1 md:gap-2">
                  <Target className="w-3 h-3 hidden md:block" /> TARGET CLICKS
                </p>
                <p className="text-2xl md:text-5xl font-black text-white">
                  {((budget * (budget < 20000 ? 45 : budget < 60000 ? 55 : 75)) * 0.021).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1 md:gap-2">
                  <Sparkles className="w-3 h-3 hidden md:block" /> EST. DELIVERABLES
                </p>
                <p className="text-2xl md:text-5xl font-black text-white">
                  {Math.floor(budget / (budget < 20000 ? 800 : 1200))}
                </p>
              </div>

              <div className="flex flex-col">
                <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-1 md:gap-2">
                  <ArrowUpRight className="w-3 h-3 hidden md:block" /> PROJECTED ROAS
                </p>
                <p 
                  className="text-2xl md:text-5xl font-black transition-colors duration-500"
                  style={{ color: budget < 20000 ? '#00ffcc' : budget < 60000 ? '#9900ff' : '#ff0055' }}
                >
                  {budget < 20000 ? '2.8x' : budget < 60000 ? '4.2x' : '6.5x'}
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5 flex justify-center">
              <Link 
                href="/contact"
                className="w-full md:w-auto px-6 md:px-10 py-4 md:py-5 bg-white text-black text-center font-black uppercase tracking-widest text-xs md:text-base rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                INITIALIZE BRIEFING
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. EARLY-STAGE TRUST SIGNAL SECTION */}
      <section className="py-24 md:py-32 bg-[#ff0055] border-y border-white/20 transform skew-y-2 relative z-20 shadow-[0_0_50px_rgba(255,0,85,0.4)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 transform -skew-y-2">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 md:mb-8 text-black drop-shadow-lg">
              Foundational Agility.
            </h2>
            <p className="text-lg md:text-2xl font-bold text-white mb-8 md:mb-10 leading-relaxed drop-shadow-md">
              We operate without the bloated account-manager layers of legacy agencies. Direct founder-level access. Strict capacity limits. We restrict our active deployment roster to ensure absolute focus on every campaign architecture we build.
            </p>
          </div>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section className="py-32 md:py-40 px-6 lg:px-8 text-center relative z-10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-[8rem] leading-[0.8] font-black uppercase tracking-tighter mb-12"
          >
            Initialize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#9900ff]">Partnership.</span>
          </motion.h2>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-bold leading-relaxed">
            Whether you are a brand looking to establish market dominance or a creator ready to scale your infrastructure, we are ready to deploy.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Magnetic>
              <Link 
                href="/contact"
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] block text-center text-xs md:text-base"
              >
                INITIALIZE BRIEFING
              </Link>
            </Magnetic>
            <div className="flex gap-4 w-full sm:w-auto justify-center mt-4 sm:mt-0 sm:ml-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 hover:border-[#ff0055] hover:text-[#ff0055] transition-all border border-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-white/10 bg-black flex flex-col items-center gap-4">
        <a href="mailto:mountliftagency@gmail.com?subject=MT/LFT%20System%20Inquiry:%20Brand%20Briefing" className="text-gray-400 hover:text-[#ff0055] font-bold text-sm md:text-base underline decoration-2 underline-offset-4 transition-colors">
          mountliftagency@gmail.com
        </a>
        <p className="text-gray-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">
          © 2026 MountLift. All systems operational.
        </p>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </main>
  )
}