'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Target, Users, TrendingUp, Lightbulb, Globe, Heart, CheckCircle2, Link as LinkIcon, BarChart3, Sparkles, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function AboutUs() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = useState(0)

  // 1. Added heroRef
  const heroRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)
      
      // 2. Added hero to monitored sections
      const sections = [
        { ref: heroRef, id: 'hero' },
        { ref: missionRef, id: 'mission' },
        { ref: valuesRef, id: 'values' },
        { ref: approachRef, id: 'approach' },
        { ref: teamRef, id: 'team' }
      ]

      sections.forEach(({ ref, id }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          // Adjusted trigger point for better mobile experience
          const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0
          
          setVisibleSections(prev => {
            const newSet = new Set(prev)
            if (isVisible) {
              newSet.add(id)
            } else {
              newSet.delete(id)
            }
            return newSet
          })
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    // Force hero visible on mount to prevent "empty" look if JS lags
    setVisibleSections(new Set(['hero']))
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const values = [
    {
      title: 'Authenticity First',
      description: 'We believe in genuine connections between brands and creators.',
      icon: Heart,
      color: 'from-pink-600 to-rose-500'
    },
    {
      title: 'Data-Driven',
      description: 'Strategies backed by comprehensive analytics and insights.',
      icon: TrendingUp,
      color: 'from-indigo-600 to-blue-500'
    },
    {
      title: 'Innovation',
      description: 'Pushing boundaries with fresh ideas and cutting-edge approaches.',
      icon: Lightbulb,
      color: 'from-amber-500 to-orange-500'
    },
    {
      title: 'Partnership',
      description: 'Long-term partners committed to mutual growth and success.',
      icon: Users,
      color: 'from-emerald-600 to-teal-500'
    }
  ]

  const approach = [
    {
      title: 'Strategic Planning',
      description: 'Campaign development with clear KPIs.',
      stats: 'Step 01'
    },
    {
      title: 'Creator Matching',
      description: 'AI-powered matching algorithm.',
      stats: 'Step 02'
    },
    {
      title: 'Performance Tracking',
      description: 'Real-time analytics and optimization.',
      stats: 'Step 03'
    },
    {
      title: 'Content Excellence',
      description: 'Creative direction for compelling content.',
      stats: 'Step 04'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden font-sans">
      
      {/* --- ADDED: Background Grid Texture (Fills empty white space) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #6366F1 1px, transparent 1px),
            linear-gradient(to bottom, #6366F1 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-white/0'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="text-2xl font-bold tracking-tight transition-all duration-300 hover:tracking-wider bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
              MOUNTLIFT
            </Link>

            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors group bg-white/80 px-4 py-2 rounded-full border border-gray-200 backdrop-blur-sm hover:border-indigo-300"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* 3. Attached ref={heroRef} here so animation works */}
      <section ref={heroRef} className="min-h-[85vh] flex items-center justify-center px-6 lg:px-8 pt-24 relative overflow-hidden">
        
        {/* Stronger Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/80 via-white to-white z-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-violet-300/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-indigo-300/20 rounded-full blur-[100px]"></div>

        {/* --- ADDED: Floating Bubbles (Fills peripheral empty space) --- */}
        <div className="absolute top-32 left-10 w-24 h-24 glossy-bubble floating-element-slow opacity-60"></div>
        <div className="absolute top-40 right-20 w-32 h-32 glossy-bubble-lg floating-element-delayed opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 glossy-bubble-sm floating-element opacity-60"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div 
            className="inline-block px-4 py-1.5 mb-8 rounded-full bg-white border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase shadow-sm"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
            }}
          >
            Who We Are
          </div>
          <h1 
            className="text-6xl lg:text-9xl font-bold leading-tight mb-8 tracking-tight"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s'
            }}
          >
            ABOUT <br/>
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">MOUNTLIFT</span>
          </h1>
          <p 
            className="text-xl lg:text-2xl text-gray-600 mb-12 font-light leading-relaxed max-w-2xl mx-auto"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            Empowering brands and creators to build authentic connections that drive meaningful results in the digital age.
          </p>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-black text-white py-4 overflow-hidden relative z-10 rotate-1 transform origin-left scale-105 border-y-4 border-indigo-500 shadow-2xl">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-sm font-bold tracking-widest uppercase flex items-center gap-4">
              Strategy <span className="text-indigo-500">•</span> Creativity <span className="text-indigo-500">•</span> Growth <span className="text-indigo-500">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <section ref={missionRef} className="py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 
                className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight text-gray-900"
                style={{
                  opacity: visibleSections.has('mission') ? 1 : 0,
                  transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
                }}
              >
                Our Mission
              </h2>
              <div 
                className="space-y-6 text-lg text-gray-600 leading-relaxed font-light"
                style={{
                  opacity: visibleSections.has('mission') ? 1 : 0,
                  transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
                }}
              >
                <p className="border-l-4 border-indigo-500 pl-6">
                  At MountLift, we bridge the gap between exceptional brands and talented creators, 
                  fostering partnerships that transcend traditional advertising. Our mission is to 
                  revolutionize influencer marketing through data-driven strategies.
                </p>
                <p>
                  We believe that the most powerful marketing happens when genuine human connections 
                  meet strategic excellence. Every campaign we craft is designed to not only reach 
                  audiences but to resonate with them on a deeper level.
                </p>
              </div>
            </div>

            {/* Right: DNA / Hub Visualization */}
            <div 
              className="relative h-[500px]"
              style={{
                opacity: visibleSections.has('mission') ? 1 : 0,
                transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white rounded-[2.5rem] border border-indigo-100 shadow-2xl overflow-hidden flex items-center justify-center p-8">
                {/* Connecting Strands */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="strandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#e0e7ff" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#e0e7ff" />
                    </linearGradient>
                  </defs>
                  <path d="M 50 50 Q 35 50 20 25" fill="none" stroke="url(#strandGradient)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M 50 50 Q 65 50 80 30" fill="none" stroke="url(#strandGradient)" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M 50 50 Q 50 70 50 85" fill="none" stroke="url(#strandGradient)" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>

                {/* Central Bullseye */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                   <div className="relative flex items-center justify-center w-24 h-24 bg-black rounded-full shadow-2xl shadow-indigo-500/30 ring-4 ring-white">
                      <Target className="w-10 h-10 text-white" />
                      <div className="absolute inset-0 rounded-full border border-indigo-400 scale-150 animate-ping opacity-20"></div>
                   </div>
                </div>

                {/* Orbiting Cards */}
                <div className="absolute top-[15%] left-[5%] bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float-slow z-30">
                   <div className="w-10 h-10 bg-indigo-50 rounded-full flex shrink-0 items-center justify-center text-indigo-600">
                     <LinkIcon size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-bold tracking-wide">FOCUS</div>
                     <div className="font-bold text-sm">Connection</div>
                   </div>
                </div>

                <div className="absolute top-[20%] right-[5%] bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float-delayed z-30">
                   <div className="w-10 h-10 bg-blue-50 rounded-full flex shrink-0 items-center justify-center text-blue-600">
                     <BarChart3 size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-bold tracking-wide">INSIGHT</div>
                     <div className="font-bold text-sm">Data Strategy</div>
                   </div>
                </div>

                <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float z-30 w-max">
                   <div className="w-10 h-10 bg-pink-50 rounded-full flex shrink-0 items-center justify-center text-pink-600">
                     <Sparkles size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-bold tracking-wide">STYLE</div>
                     <div className="font-bold text-sm">Creative Storytelling</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-32 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
              style={{
                opacity: visibleSections.has('values') ? 1 : 0,
                transform: visibleSections.has('values') ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
              }}
            >
              Our Core Values
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              style={{
                opacity: visibleSections.has('values') ? 1 : 0,
                transform: visibleSections.has('values') ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              The principles that guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
                style={{
                  opacity: visibleSections.has('values') ? 1 : 0,
                  transform: visibleSections.has('values') ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: The MountLift Workflow (Rival-Inspired) */}
      <section className="py-24 px-6 lg:px-8 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent"
            >
              THE CAMPAIGN ECOSYSTEM
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
              We don't just find influencers; we manage the entire lifecycle. From AI-driven discovery to real-time ROI tracking.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-50 via-indigo-100 to-indigo-50 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
              {[
                { 
                  title: "Discovery", 
                  icon: "🔍", 
                  desc: "AI-powered matching to find creators who actually align with your brand DNA." 
                },
                { 
                  title: "Vetting", 
                  icon: "🛡️", 
                  desc: " rigorous fraud checks, audience health analysis, and brand safety scanning." 
                },
                { 
                  title: "Activation", 
                  icon: "🚀", 
                  desc: "Contracting, briefing, and content approvals handled entirely by our team." 
                },
                { 
                  title: "Amplification", 
                  icon: "📢", 
                  desc: "Boosting top-performing organic content with paid media strategies." 
                },
                { 
                  title: "Reporting", 
                  icon: "📊", 
                  desc: "Live dashboards tracking CPM, CPA, and real conversion data." 
                }
              ].map((step, i) => (
                <div 
                  key={i}
                  className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:bg-indigo-600 group-hover:text-white">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Step 0{i + 1}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW: "Stats Bar" (Trust Signals) */}
      <section className="py-16 bg-black text-white relative overflow-hidden">
        {/* Abstract BG */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x divide-white/10">
            {[
              { label: "Creators in Network", value: "1,200+" },
              { label: "Engagement Rate", value: "3x Avg" },
              { label: "Campaigns Optimized", value: "50+" },
              { label: "Creator Tools", value: "6+" }
            ].map((stat, i) => (
              <div key={i} className="p-4">
                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent font-sans">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision / CTA Section */}
      <section ref={teamRef} className="py-32 px-6 lg:px-8 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div 
            className="mb-12 inline-flex"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
            }}
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
              <Globe className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 
            className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            Join Our Journey
          </h2>
          
          <p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
            }}
          >
            Whether you're a brand looking to make an impact or a creator ready to amplify your voice, 
            we invite you to be part of something bigger.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s'
            }}
          >
            <Link 
              href="/"
              className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
            >
              Start a Campaign
            </Link>
            <div className="flex gap-4 ml-0 sm:ml-6">
              <a href="https://www.instagram.com/mount.lift/" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/mountlift-agency/" className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(8px) rotate(-1deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(8px); }
          50% { transform: translateY(8px) translateX(-8px); }
          75% { transform: translateY(-8px) translateX(12px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(1deg); }
          66% { transform: translateY(6px) rotate(-1deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 3s; }
        .floating-element { animation: float 8s ease-in-out infinite; }
        .floating-element-slow { animation: float-slow 12s ease-in-out infinite; }
        .floating-element-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 2s; }
        
        .glossy-bubble {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(200, 200, 255, 0.4) 100%);
          border-radius: 50%;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glossy-bubble-lg {
          @extend .glossy-bubble;
          background: linear-gradient(135deg, rgba(255, 230, 255, 0.6) 0%, rgba(200, 200, 255, 0.2) 100%);
        }
        .glossy-bubble-sm {
          @extend .glossy-bubble;
          background: linear-gradient(135deg, rgba(230, 230, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>
    </div>
  )
}
