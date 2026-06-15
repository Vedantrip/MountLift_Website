'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Target, Users, TrendingUp, Globe, Instagram, Linkedin, BarChart3, ShieldAlert, Cpu, Network, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'

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
    <Link href="/" className="flex items-center gap-1 group">
      <span className="text-xl font-black tracking-tighter text-white uppercase">MT/LFT</span>
      <motion.span
        animate={{ 
          scale: [1, 1.4, 1], 
          rotate: [0, 15, -5, 0],
          filter: ["brightness(1)", "brightness(2)", "brightness(1)"]
        }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-xl text-[#ff0055] drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]"
      >
        ⚡️
      </motion.span>
    </Link>
  )
}

export default function AboutUsAdvanced() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Dynamic Real-time Equalizer Heights Array State
  const [eqHeights, setEqHeights] = useState([35, 60, 20, 80, 45, 55, 30])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    // Animate Equalizer Nodes without performance lag loops
    const interval = setInterval(() => {
      setEqHeights(prev => prev.map(() => Math.floor(Math.random() * 75) + 15))
    }, 120)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [0, 45])

  const values = [
    { title: 'Authentic Verification', description: 'We filter out bot traffic and engagement pods. Genuine connections only.', icon: ShieldAlert, color: '#ff0055' },
    { title: 'Data Architecture', description: 'Every strategy is backed by deep analytics, not just vanity metrics.', icon: TrendingUp, color: '#00ffcc' },
    { title: 'Technical Innovation', description: 'Pushing boundaries with our proprietary creator vetting algorithms.', icon: Cpu, color: '#9900ff' },
    { title: 'Symbiotic Scaling', description: 'Long-term brand and creator partnerships committed to mutual growth.', icon: Users, color: '#ffcc00' }
  ]

  const workflow = [
    { phase: "01", title: "Discovery", icon: Network, desc: "Algorithmic matching to find creators who align with brand DNA.", color: "from-[#00ffcc] to-[#00aa88]" },
    { phase: "02", title: "Vetting", icon: ShieldAlert, desc: "Rigorous fraud checks and audience health analysis.", color: "from-[#ff0055] to-[#aa0033]" },
    { phase: "03", title: "Activation", icon: Globe, desc: "Contracting, briefing, and content approvals handled by our team.", color: "from-[#9900ff] to-[#5500aa]" },
    { phase: "04", title: "Telemetry", icon: BarChart3, desc: "Live dashboards tracking CPM, CPA, and conversion velocity.", color: "from-[#ffcc00] to-[#aa8800]" }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden font-sans selection:bg-[#00ffcc] selection:text-black noise grid-overlay">
      
      {/* Navigation */}
      <nav className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-24">
          <AnimatedLogo />
          
          <Magnetic>
            <Link href="/" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#00ffcc] transition-colors border border-white/10 px-6 py-3 rounded-full hover:border-[#00ffcc]/50 bg-black/50">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Terminate & Return
            </Link>
          </Magnetic>
        </div>
      </nav>

      {/* Hero Section - Drastic 3D transformations & Kinetic Interactions */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 overflow-hidden perspective-1000">
        
        {/* Massive breathing orb background */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[800px] h-[800px] bg-gradient-to-tr from-[#9900ff]/20 to-[#00ffcc]/20 blur-[150px] rounded-full" 
          />
        </motion.div>

        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity, rotateX: rotateX }} 
          className="max-w-5xl mx-auto text-center relative z-10 preserve-3d w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: -45 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          >
            {/* Interactive Cyber-Badge */}
            <motion.div 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,0,85,0.5)", borderColor: "rgba(255,0,85,1)" }}
              className="inline-flex items-center gap-2 border border-[#ff0055]/50 bg-[#ff0055]/10 text-[#ff0055] font-black tracking-widest uppercase text-xs px-6 py-2 rounded-full mb-8 shadow-[0_0_30px_rgba(255,0,85,0.3)] cursor-crosshair transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#ff0055] animate-ping" />
              System Architecture // Core Identity
            </motion.div>
            
            {/* Infinite Flowing Gradient Headline */}
            <h1 className="text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] mb-8 uppercase flex flex-col relative group">
              <span className="text-white drop-shadow-2xl">WE ARE</span>
              <motion.span 
                className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#00ffcc,#9900ff,#ff0055,#00ffcc)] bg-[length:300%_auto] drop-shadow-[0_0_30px_rgba(0,255,204,0.3)]"
                animate={{ backgroundPosition: ["0% center", "-300% center"] }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
              >
                MOUNTLIFT.
              </motion.span>
            </h1>
            
            {/* Interactive Subtext */}
            <p className="text-xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-bold leading-tight mix-blend-difference">
              Empowering brands to build authentic infrastructure that drives{' '}
              <motion.span 
                whileHover={{ color: "#ffffff", textShadow: "0 0 20px #00ffcc", borderBottomColor: "#ffffff" }}
                className="text-[#00ffcc] underline decoration-2 underline-offset-4 cursor-pointer transition-all duration-300"
              >
                measurable conversions
              </motion.span>
              {' '}in the digital age.
            </p>
          </motion.div>
        </motion.div>

        {/* Kinetic Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-gray-500 font-mono text-[10px] uppercase tracking-widest"
        >
          <span>Initialize Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "200%"] }} 
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#00ffcc] to-transparent"
            />
          </div>
        </motion.div>

      </section>

      {/* Hyper-Speed Marquee Strip */}
      <div className="bg-[#ff0055] py-4 overflow-hidden relative z-20 border-y border-white/20 transform -skew-y-2 translate-y-12 shadow-[0_10px_30px_rgba(255,0,85,0.3)]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="mx-6 text-2xl font-black uppercase tracking-tighter flex items-center gap-6 text-black">
              Strategy <span className="text-white">✕</span> Execution <span className="text-white">✕</span> Telemetry <span className="text-white">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HUMOROUS IG QUOTE & FLOATING EMOJI SECTION ── */}
      <section className="relative z-30 py-32 px-6 max-w-5xl mx-auto mt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 15 }}
          className="card-glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,255,204,0.1)]"
        >
          {/* Zesty Giant Floating Emoji wrapper */}
          <motion.div 
            animate={{ 
              y: [-15, 15, -15],
              rotate: [-6, 6, -6],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 4, 
              ease: "easeInOut" 
            }}
            className="text-7xl md:text-8xl block mb-8 select-none drop-shadow-[0_0_40px_rgba(0,255,204,0.3)] cursor-grab active:cursor-grabbing"
            whileHover={{ scale: 1.2, rotate: 15 }}
          >
            🤑
          </motion.div>

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ffcc] bg-[#00ffcc]/10 px-4 py-1 rounded-full mb-8 inline-block">
            Reality Check
          </span>

          <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto flex flex-col gap-2">
            <span className="text-[#ff0055]">Still think influencer marketing is about views?</span>
            <span className="text-[#00ffcc] text-6xl md:text-[6rem] leading-none my-4">good.</span>
            <span className="text-gray-300 text-2xl md:text-4xl font-bold">
              that's why <span className="text-[#ff0055] uppercase">brands</span> <span className="text-white uppercase">need us.</span>
            </span>
          </h2>

          <div className="w-16 h-1 bg-gradient-to-r from-[#00ffcc] to-[#ff0055] mx-auto my-10 rounded-full" />

          <p className="text-[11px] font-black uppercase tracking-widest text-gray-500 flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-[#ffcc00]" /> MOUNTLIFT STRATEGIC BLUEPRINT
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-40 px-6 lg:px-8 relative z-10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 uppercase leading-[0.8]">
              System<br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-gray-500 to-[#0a0a0a]">Directives.</span>
            </h2>
            <div className="space-y-8 text-xl text-gray-400 font-medium leading-relaxed">
              <div className="relative pl-8 border-l-4 border-[#00ffcc]">
                <div className="absolute top-0 left-0 w-4 h-4 bg-[#00ffcc] -translate-x-[10px] rounded-sm" />
                <p className="text-white">
                  At MountLift, we bridge the gap between enterprise brands and native creators. Our mission is to revolutionize influencer marketing by removing guesswork and implementing strict, data-driven architecture.
                </p>
              </div>
              <p className="pl-8">
                We believe that the most powerful marketing happens when genuine human connections meet technical excellence. Every campaign we deploy is engineered to resonate deeply and scale aggressively.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Interactive Data Architecture Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="card-glass h-[500px] rounded-[3rem] relative overflow-hidden group border border-white/10"
          >
            <div className="absolute inset-0 grid-overlay opacity-30" />
            
            <div className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-widest z-10">
              <div className="text-gray-500 mb-1">NODE_ID: MTLFT-CORE</div>
              <div className="text-[#00ffcc] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00ffcc] rounded-full animate-ping" />
                STATUS: LIVE_MATRIX
              </div>
            </div>

            <div className="absolute top-8 right-8 border border-[#ff0055]/30 bg-[#ff0055]/10 px-4 py-2 rounded-md flex items-center gap-2 z-10">
              <ShieldAlert className="w-4 h-4 text-[#ff0055]" />
              <span className="font-black uppercase text-[10px] text-white">Vetting Locked</span>
            </div>

            {/* Center abstract node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <div className="w-72 h-72 border border-white/5 rounded-full flex items-center justify-center relative">
                <div className="w-52 h-52 border border-[#00ffcc]/20 rounded-full flex items-center justify-center border-dashed">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    className="w-32 h-32 bg-[#0a0a0a] rounded-full border-2 border-[#00ffcc] shadow-[0_0_50px_rgba(0,255,204,0.3)] flex items-center justify-center relative z-10 transition-transform duration-500 cursor-pointer"
                  >
                    <Network className="w-12 h-12 text-[#00ffcc]" />
                  </motion.div>
                </div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-white/5" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-white/5" />
              </div>
            </div>

            {/* Bottom Left: Dynamic Live Fluctuating Equalizer Real-time Bars */}
            <div className="absolute bottom-8 left-8 flex items-end gap-1.5 z-10 h-[80px]">
              {eqHeights.map((height, i) => (
                <motion.div 
                  key={i} 
                  className="w-2 bg-[#9900ff]/70 rounded-t-sm transition-all duration-100 ease-out" 
                  style={{ height: `${height}px` }} 
                />
              ))}
            </div>

            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-right text-gray-500 uppercase tracking-widest z-10">
              <div>LATENCY: 12ms</div>
              <div>PACKETS: 14,029</div>
              <div className="text-[#9900ff] mt-1">SECURE ARRAY ACTIVE</div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 lg:px-8 border-t border-white/10 bg-black/50 backdrop-blur-2xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-4 text-white">Core Protocols.</h2>
            <p className="text-2xl text-gray-500 font-bold max-w-3xl">
              The foundational logic that dictates every execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
                whileHover={{ y: -12, scale: 1.03 }}
                className="card-glass p-8 rounded-3xl group relative overflow-hidden cursor-crosshair"
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                  style={{ backgroundColor: value.color }}
                />
                
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-black/50 border border-white/10 relative z-10 group-hover:rotate-12 transition-transform duration-300"
                  style={{ color: value.color }}
                >
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white relative z-10">{value.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed relative z-10">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Campaign Ecosystem */}
      <section className="py-40 px-6 lg:px-8 relative bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
           <h2 className="text-[20vw] font-black uppercase leading-none">PIPELINE</h2>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white text-glow-cyan">
              The Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-bold">
              We don't just find influencers; we architect the entire lifecycle. From algorithmic discovery to real-time ROI tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflow.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, rotateX: 90, y: 50 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.15, type: "spring", bounce: 0.4 }}
                className="relative p-8 rounded-3xl bg-[#111] border border-white/10 hover:border-white/40 transition-all group overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${step.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                
                <div className="flex justify-between items-start mb-8">
                  <step.icon className="w-10 h-10 text-white opacity-50 group-hover:opacity-100 group-hover:rotate-6 transition-all" />
                  <span className="text-4xl font-black text-white/10 group-hover:text-white/30 transition-colors">{step.phase}</span>
                </div>
                
                <h3 className="text-3xl font-black uppercase text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 font-medium">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Giant Stats Bar */}
      <section className="py-32 bg-[#ff0055] border-y border-white/20 transform skew-y-2 relative z-20 shadow-[0_0_50px_rgba(255,0,85,0.4)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 transform -skew-y-2">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x divide-black/20">
            {[
              { label: "Vetted Creators", value: "1.2K+" },
              { label: "Engagement Delta", value: "3.2X" },
              { label: "Deployments", value: "50+" },
              { label: "Internal Tools", value: "06" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.1 }}
                className="p-4"
                whileHover={{ scale: 1.1, rotate: i % 2 === 0 ? 2 : -2 }}
              >
                <div className="text-6xl lg:text-8xl font-black mb-4 text-black tracking-tighter drop-shadow-lg">
                  {stat.value}
                </div>
                <div className="text-xl font-black uppercase tracking-widest text-white drop-shadow-md">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section className="py-40 px-6 lg:px-8 text-center relative z-10 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-[8rem] leading-[0.8] font-black uppercase tracking-tighter mb-12"
          >
            Initialize <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffcc] to-[#9900ff]">Partnership.</span>
          </motion.h2>
          
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto mb-16 font-bold leading-relaxed">
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
                className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] block text-center"
              >
                Start a Campaign
              </Link>
            </Magnetic>
            <div className="flex gap-4 ml-0 sm:ml-6">
              <a href="https://www.instagram.com/mount.lift/" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 hover:border-[#ff0055] hover:text-[#ff0055] transition-all border border-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/mountlift-agency" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-full hover:bg-white/20 hover:border-[#00ffcc] hover:text-[#00ffcc] transition-all border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-600 font-bold uppercase tracking-widest text-sm border-t border-white/10 bg-black">
        © {new Date().getFullYear()} MountLift. All systems operational.
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
    </div>
  )
}
