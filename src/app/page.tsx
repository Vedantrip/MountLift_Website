'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Instagram, Linkedin, Mail, ArrowUpRight, Menu, X, Target, TrendingUp, Lightbulb, Users, ChevronRight, Calculator, Camera, Video, BarChart3, DollarSign, Hash, Calendar, Download, Zap, Globe, Palette, Music, FileText, Star, TrendingUp as Analytics, Shield, Clock, Award } from 'lucide-react'
import Link from 'next/link'

export default function MountLift() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [headlineOpacity, setHeadlineOpacity] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [magneticButton, setMagneticButton] = useState({ x: 0, y: 0 })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null)

  const benefitsRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState(false)
  const caseStudiesRef = useRef<HTMLDivElement>(null)
  const exclusiveRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaButtonRef = useRef<HTMLAnchorElement>(null)

  // Accent color - subtle neutral tone
  const accentColor = '#6B7280'
  const accentHover = '#4B5563'

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)
      
      // Check which sections are visible
      const sections = [
        { ref: benefitsRef, id: 'benefits' },
        { ref: caseStudiesRef, id: 'caseStudies' },
        { ref: exclusiveRef, id: 'exclusive' },
        { ref: toolsRef, id: 'tools' },
        { ref: contactRef, id: 'contact' }
      ]

      sections.forEach(({ ref, id }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0
          
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

      // Check bubble-headline collision
      checkBubbleCollision()
    }
    
    const checkBubbleCollision = () => {
      if (!headlineRef.current) return
      
      const headlineRect = headlineRef.current.getBoundingClientRect()
      const bubbles = document.querySelectorAll('.glossy-bubble, .glossy-bubble-sm, .glossy-bubble-lg')
      
      let hasCollision = false
      
      bubbles.forEach(bubble => {
        const bubbleRect = bubble.getBoundingClientRect()
        
        // Check if bubble overlaps with headline
        if (
          bubbleRect.left < headlineRect.right &&
          bubbleRect.right > headlineRect.left &&
          bubbleRect.top < headlineRect.bottom &&
          bubbleRect.bottom > headlineRect.top
        ) {
          hasCollision = true
        }
      })
      
      // Set opacity based on collision
      setHeadlineOpacity(hasCollision ? 0.3 : 1)
    }
    
    // Check collision every frame for smooth animation
    const animationFrame = requestAnimationFrame(function animate() {
      checkBubbleCollision()
      requestAnimationFrame(animate)
    })
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
      setShowPopup(true)

      // auto close popup after 4 seconds
      setTimeout(() => setShowPopup(false), 4000)
    }
  }

  const createRipple = (e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaButtonRef.current) return
    
    const button = ctaButtonRef.current
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * 0.15
    const deltaY = (e.clientY - centerY) * 0.15
    
    setMagneticButton({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setMagneticButton({ x: 0, y: 0 })
  }

  const navItems = [
    'Influencer Marketing',
    'Tools for Creators',
    'Exclusive Representation',
    'Our Work',
    'About Us',
    'Contact'
  ]

  const benefits = [
    {
      title: 'Focused Campaign Design',
      short: 'Strategic influencer campaigns tailored to your brand.',
      long: `We design influencer campaigns with a clear objective-first approach.
Every campaign begins with understanding your brand DNA, target audience, and
conversion goals. From creator selection to content format and publishing
timelines, each decision is made to maximize relevance, authenticity, and ROI.`,
      icon: Target,
      color: 'from-slate-600 to-slate-500'
    },
    {
      title: 'Industry-Specific Expertise',
      short: 'Deep understanding across multiple verticals.',
      long: `Our team brings hands-on exposure across fashion, beauty, tech,
lifestyle, and emerging consumer brands. This allows us to anticipate trends,
understand platform nuances, and design campaigns that resonate naturally
within each industry ecosystem.`,
      icon: TrendingUp,
      color: 'from-zinc-600 to-zinc-500'
    },
    {
      title: 'Consumer-Centric & Content-Driven',
      short: 'Authentic content that drives engagement.',
      long: `We focus on storytelling that feels organic, not promotional.
By aligning creators with audience psychology and platform behavior, we
ensure content feels native, relatable, and trust-driven — resulting in
higher engagement and stronger brand recall.`,
      icon: Lightbulb,
      color: 'from-stone-600 to-stone-500'
    },
    {
      title: 'Passionate & Top-Tier Team',
      short: 'A team obsessed with brand growth.',
      long: `Our team is built around strategists, creator managers, and analysts
who live and breathe the creator economy. We work as an extension of your brand,
constantly optimizing campaigns, monitoring performance, and pushing creative
boundaries.`,
      icon: Users,
      color: 'from-neutral-600 to-neutral-500'
    }
  ]

  // UPDATED: Only the 6 requested tools
  const creatorTools = [
    {
      title: 'Engagement Rate Calculator',
      description: 'Calculate your true engagement rate across all platforms.',
      icon: Calculator,
      color: 'from-blue-600 to-blue-500',
      category: 'Analytics',
      featured: true
    },
    {
      title: 'Hashtag Generator',
      description: 'Generate trending hashtags to maximize reach.',
      icon: Hash,
      color: 'from-pink-600 to-pink-500',
      category: 'Growth'
    },
    {
      title: 'Rate Calculator',
      description: 'Determine your worth with industry standards.',
      icon: DollarSign,
      color: 'from-yellow-600 to-yellow-500',
      category: 'Monetization'
    },
    {
      title: 'Media Kit Builder',
      description: 'Create professional media kits with your stats.',
      icon: FileText,
      color: 'from-green-600 to-green-500',
      category: 'Professional'
    },
    {
      title: 'Content Idea Generator',
      description: 'Never run out of content ideas with AI.',
      icon: Lightbulb,
      color: 'from-amber-600 to-amber-500',
      category: 'Planning'
    },
    {
      title: 'Video Editing Tools',
      description: 'Professional video templates for social media.',
      icon: Video,
      color: 'from-orange-600 to-orange-500',
      category: 'Creation'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      {/* Background Grid Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Sticky Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-xl' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tight transition-all duration-300 hover:tracking-wider hover:text-gray-700">
              MOUNTLIFT
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === 'Influencer Marketing' ? '/influencer-marketing' :
                    item === 'Tools for Creators' ? '#tools' : 
                    item === 'Exclusive Representation' ? '#exclusive-representation' :
                    item === 'Our Work' ? '#our-work' :
                    item === 'About Us' ? '/about-us' :
                    item === 'Contact' ? '#contact' : '#'
                  }
                  className="relative text-sm font-light tracking-wide transition-all duration-300 group"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentHover}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent transition-all duration-500 group-hover:w-full transform -translate-x-1/2"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 transition-all duration-300 hover:text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === 'Influencer Marketing' ? '/influencer-marketing' :
                    item === 'Tools for Creators' ? '#tools' : 
                    item === 'Exclusive Representation' ? '#exclusive-representation' :
                    item === 'Our Work' ? '#our-work' :
                    item === 'About Us' ? '/about-us' :
                    item === 'Contact' ? '#contact' : '#'
                  }
                  className="block text-sm font-light py-2 hover:text-gray-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="influencer-marketing" ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24 relative bg-white overflow-hidden">
        {/* Gradient Blur Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black opacity-3 blur-[100px] rounded-full"></div>
        </div>

        {/* Glossy Floating Bubbles with enhanced parallax */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 glossy-bubble floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.01) * 20}px)` 
          }}
        ></div>
        <div 
          className="absolute top-40 right-20 w-24 h-24 glossy-bubble-lg floating-element-delayed" 
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.cos(scrollY * 0.01) * 15}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-32 left-20 w-40 h-40 glossy-bubble floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.4}px) translateX(${Math.sin(scrollY * 0.008) * 25}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-20 h-20 glossy-bubble-sm floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.25}px) translateX(${Math.cos(scrollY * 0.012) * 18}px)` 
          }}
        ></div>
        <div 
          className="absolute top-60 left-1/4 w-16 h-16 glossy-bubble floating-element-delayed" 
          style={{ 
            transform: `translateY(${scrollY * 0.35}px) translateX(${Math.sin(scrollY * 0.009) * 22}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-1/3 w-28 h-28 glossy-bubble-lg floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.15}px) translateX(${Math.cos(scrollY * 0.011) * 20}px)` 
          }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 
            ref={headlineRef}
            className="text-5xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight transition-all duration-1000 ease-out-quint"
            style={{ 
              opacity: headlineOpacity,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(30px)',
              transitionDelay: '0ms'
            }}
          >
            LIFT YOUR BRAND
            <br />
            WITH INFLUENCER-FIRST
            <br />
            CAMPAIGNS
          </h1>
          <p 
            className="text-lg lg:text-xl text-gray-600 mb-16 max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            MountLift is a data-driven influencer marketing agency that connects premium brands 
            with authentic creators to drive measurable results and meaningful engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:mountliftagency@gmail.com?subject=Book a Campaign Call"
              ref={ctaButtonRef}
              onClick={createRipple}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative inline-block px-12 py-5 bg-black text-white font-medium rounded-full transition-all duration-500 transform overflow-hidden group"
              style={{
                transform: `translate(${magneticButton.x}px, ${magneticButton.y}px) scale(${visibleSections.has('hero') ? 1 : 0.95})`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease'
              }}
            >
              <span className="relative z-10 flex items-center">
                Book a Campaign Call
                <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {ripples.map(ripple => (
                <span
                  key={ripple.id}
                  className="absolute bg-white/30 rounded-full animate-ripple"
                  style={{
                    left: ripple.x - 10,
                    top: ripple.y - 10,
                    width: 20,
                    height: 20
                  }}
                />
              ))}
            </a>
            <button 
              className="px-12 py-5 border border-gray-800 font-light hover:bg-gray-800 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
              style={{
                transform: `scale(${visibleSections.has('hero') ? 1 : 0.95})`,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}
            >
              For Creators
            </button>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Key Benefits Cards (Redesigned - Slide Up Drawer) */}
      <section
        id="benefits"
        ref={benefitsRef}
        className="relative min-h-screen px-6 lg:px-8 bg-gray-50 overflow-hidden flex items-center"
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #000 1px, transparent 1px),
                linear-gradient(to bottom, #000 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon

              return (
                <div
                  key={index}
                  className="group relative h-[420px] bg-white rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-gray-200"
                >
                  {/* Ambient Background Glow */}
                  <div 
                    className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-700 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3`} 
                  />

                  {/* --- MAIN CARD CONTENT (Visible Default) --- */}
                  <div className="absolute inset-0 p-8 flex flex-col h-full z-10">
                    <div className="mb-auto">
                      {/* Icon Container */}
                      <div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-90 group-hover:shadow-md transition-all duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 pr-4">
                        {benefit.title}
                      </h3>
                      
                      {/* Short Description */}
                      <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:opacity-20 transition-opacity duration-500">
                        {benefit.short}
                      </p>
                    </div>

                    {/* Footer Label */}
                    <div className="pt-6 border-t border-gray-50 mt-auto group-hover:opacity-20 transition-opacity duration-500">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-300">
                        Our Focus
                      </div>
                    </div>
                  </div>

                  {/* --- SLIDE-UP DRAWER (Visible on Hover) --- */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-xl p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
                    <div className="mb-6 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${benefit.color} flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Deep Dive</h4>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {benefit.long}
                    </p>

                    <div className="w-12 h-1 bg-gray-100 rounded-full mb-auto"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Our Work / Campaign Roadmap (Replaced Case Studies) */}
      <section id="our-work" ref={caseStudiesRef} className="py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className={`text-4xl lg:text-6xl font-bold mb-6 tracking-tight transition-all duration-700 ${
                visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              FROM STRATEGY TO SCALE
            </h2>
            <p 
              className={`text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed transition-all duration-700 delay-100 ${
                visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              We don't rely on guesswork. Every campaign follows our proven 4-step framework 
              designed to maximize ROI and brand alignment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-10"></div>

            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                desc: "We dive deep into your brand DNA, audience demographics, and campaign goals to craft a bespoke roadmap.",
                icon: Target
              },
              {
                step: "02",
                title: "Curated Matching",
                desc: "Using data-driven insights, we identify and vet creators who perfectly align with your brand's voice and values.",
                icon: Users
              },
              {
                step: "03",
                title: "Creative Activation",
                desc: "We manage the entire workflow, ensuring content is authentic, high-quality, and delivered on schedule.",
                icon: Zap
              },
              {
                step: "04",
                title: "Analysis & Scale",
                desc: "Real-time monitoring allows us to optimize performance live and scale what works for maximum impact.",
                icon: TrendingUp
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={`relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group ${
                  visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step Number Badge */}
                <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20 relative z-10">
                  {item.step}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div 
            className={`mt-20 text-center transition-all duration-1000 delay-500 ${
              visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
             <div className="inline-block p-1 rounded-full bg-gray-100">
               <a 
                 href="mailto:mountliftagency@gmail.com"
                 className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2 group"
               >
                 Start Your Campaign
                 <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Exclusive Representation Section */}
      <section id="exclusive-representation" ref={exclusiveRef} className="py-32 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div 
          className="absolute top-20 left-10 w-24 h-24 glossy-bubble floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.01) * 15}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-16 right-20 w-32 h-32 glossy-bubble-lg floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) translateX(${Math.cos(scrollY * 0.01) * 20}px)` 
          }}
        ></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
              }}
            >
              EXCLUSIVE REPRESENTATION
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              Partner with top-tier creators who align with your brand values and deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Talent Management</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive management services for top creators focusing on growth and brand partnerships.</p>
            </div>
            
            <div
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Brand Partnerships</h3>
              <p className="text-gray-600 leading-relaxed">Strategic connections between premium brands and vetted content creators.</p>
            </div>
            
            <div
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-500 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Strategy</h3>
              <p className="text-gray-600 leading-relaxed">Data-driven strategies to maximize creator potential and brand ROI.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="#contact"
              className="inline-block px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Tools for Creators Section */}
      <section id="tools" ref={toolsRef} className="py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Floating decorative elements */}
        <div 
          className="absolute top-20 left-10 w-24 h-24 glossy-bubble floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.01) * 15}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-16 right-20 w-32 h-32 glossy-bubble-lg floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) translateX(${Math.cos(scrollY * 0.01) * 20}px)` 
          }}
        ></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight"
              style={{
                opacity: visibleSections.has('tools') ? 1 : 0,
                transform: visibleSections.has('tools') ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
              }}
            >
              TOOLS FOR CREATORS
            </h2>
            <p 
              className="text-lg text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              style={{
                opacity: visibleSections.has('tools') ? 1 : 0,
                transform: visibleSections.has('tools') ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              Empower your creative journey with our comprehensive suite of professional tools. 
              Everything you need to grow, monetize, and succeed.
            </p>
          </div>

          {/* Tools Grid - Updated for 6 items */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creatorTools.map((tool, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col justify-between"
                  style={{
                    opacity: visibleSections.has('tools') ? 1 : 0,
                    transform: visibleSections.has('tools') ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                  }}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-3 group-hover:text-gray-700 transition-colors">
                      {tool.title}
                    </h4>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {tool.description}
                    </p>
                  </div>
                    
                  <div className="relative z-10 flex items-center justify-between mt-auto pt-4 border-t border-gray-100/50">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {tool.category}
                    </span>
                    <Link
                      href="/work-in-progress"
                      className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-black group-hover:translate-x-1 transition-all"
                    >
                      <span>Try Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div 
              className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-12 border border-gray-200"
              style={{
                opacity: visibleSections.has('tools') ? 1 : 0,
                transform: visibleSections.has('tools') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s'
              }}
            >
              <h3 className="text-3xl font-bold mb-4">Ready to Level Up?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who use our tools to grow their audience, 
                increase engagement, and monetize effectively.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Start Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Social Media & Contact */}
      <section id="contact" ref={contactRef} className="py-32 px-6 lg:px-8 bg-gray-100 relative overflow-hidden">
        {/* Floating decorative elements */}
        <div 
          className="absolute top-10 left-10 w-20 h-20 glossy-bubble floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.01) * 15}px)` 
          }}
        ></div>
        <div 
          className="absolute top-32 right-20 w-16 h-16 glossy-bubble-sm floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.15}px) translateX(${Math.cos(scrollY * 0.01) * 12}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 left-32 w-24 h-24 glossy-bubble-lg floating-element-delayed" 
          style={{ 
            transform: `translateY(${scrollY * 0.25}px) translateX(${Math.sin(scrollY * 0.008) * 18}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-10 w-12 h-12 glossy-bubble floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.18}px) translateX(${Math.cos(scrollY * 0.012) * 10}px)` 
          }}
        ></div>
        <div 
          className="absolute top-60 left-1/4 w-16 h-16 glossy-bubble-sm floating-element" 
          style={{ 
            transform: `translateY(${scrollY * 0.22}px) translateX(${Math.sin(scrollY * 0.009) * 14}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-1/3 w-20 h-20 glossy-bubble-lg floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.12}px) translateX(${Math.cos(scrollY * 0.011) * 16}px)` 
          }}
        ></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Social Media */}
          <div 
            className={`text-center mb-24 transition-all duration-1000 ${
              visibleSections.has('contact') 
                ? 'animate-fade-in-up opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <h2 className="text-4xl font-bold mb-12 tracking-tight">Our Social Media Handles</h2>
            <div className="flex justify-center space-x-10">
              <a
                href="https://www.instagram.com/mount.lift/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 group"
              >
                <Instagram className="w-8 h-8" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://www.linkedin.com/company/mountlift-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-5 rounded-full bg-blue-600 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 group"
              >
                <Linkedin className="w-8 h-8" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`text-center transition-all duration-1000 ${
              visibleSections.has('contact') 
                ? 'animate-fade-in-up opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Contact</h2>
            <p className="text-gray-600 mb-16 font-light tracking-wide">Reach out to us if you need any support.</p>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-gray-600 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-gray-600/20 font-light"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-gray-600 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-gray-600/20 font-light"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-gray-600 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-gray-600/20 font-light"
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleFormChange}
                rows={6}
                className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-gray-600 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-gray-600/20 resize-none font-light"
                required
              />
              <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-12 py-5 bg-black text-white font-medium transition-all duration-300 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
          </div>
        </div>
      </section>

      {showPopup && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-fade-in-up">
      
      {status === 'success' && (
        <>
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            ✅ Thank You!
          </h3>
          <p className="text-gray-600 mb-6">
            Your message was sent successfully.  
            We’ll get back to you shortly.
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <h3 className="text-2xl font-bold mb-4 text-red-600">
            ❌ Something went wrong
          </h3>
          <p className="text-gray-600 mb-6">
            We couldn’t send your message right now.  
            Please try again later.
          </p>
        </>
      )}

      <button
        onClick={() => setShowPopup(false)}
        className="w-full px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300"
      >
        Close
      </button>
    </div>
  </div>
)}

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4 tracking-tight">MOUNTLIFT</div>
              <p className="text-sm text-gray-400 font-light tracking-wide">Elevating brands through authentic influencer partnerships</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex space-x-10">
                <Link href="#" className="text-sm font-light hover:text-white transition-colors duration-300">Privacy</Link>
                <Link href="#" className="text-sm font-light hover:text-white transition-colors duration-300">Terms</Link>
                <Link href="#" className="text-sm font-light hover:text-white transition-colors duration-300">Careers</Link>
              </div>
              <div className="flex space-x-8">
                <a 
                  href="https://www.instagram.com/mount.lift/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/mountlift-agency/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-slide {
          from {
            opacity: 0;
            transform: translateY(5%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-fade {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(40px) rotate(2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0.5deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(1deg);
          }
          66% {
            transform: translateY(8px) rotate(-1deg);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(8px);
          }
          50% {
            transform: translateY(8px) translateX(-8px);
          }
          75% {
            transform: translateY(-8px) translateX(12px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(1deg);
          }
          66% {
            transform: translateY(6px) rotate(-1deg);
          }
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.5;
          }
          100% {
            width: 100px;
            height: 100px;
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-hero-slide {
          animation: hero-slide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-hero-fade {
          animation: hero-fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-card-enter {
          animation: card-enter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-ripple {
          animation: ripple 0.6s ease-out forwards;
        }

        .floating-element {
          animation: float 8s ease-in-out infinite;
        }

        .floating-element-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .floating-element-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 3s;
        }

        /* Glossy bubble styles */
        .glossy-bubble {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.9) 0%, 
            rgba(240, 240, 240, 0.8) 25%, 
            rgba(220, 220, 220, 0.7) 50%, 
            rgba(200, 200, 200, 0.6) 75%, 
            rgba(180, 180, 180, 0.5) 100%);
          border-radius: 50%;
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .glossy-bubble-sm {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%, 
            rgba(245, 245, 245, 0.85) 25%, 
            rgba(230, 230, 230, 0.75) 50%, 
            rgba(210, 210, 210, 0.65) 75%, 
            rgba(190, 190, 190, 0.55) 100%);
          border-radius: 50%;
          box-shadow: 
            0 6px 24px rgba(0, 0, 0, 0.08),
            inset 0 2px 3px rgba(255, 255, 255, 0.9),
            inset 0 -2px 3px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .glossy-bubble-lg {
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.85) 0%, 
            rgba(235, 235, 235, 0.75) 25%, 
            rgba(215, 215, 215, 0.65) 50%, 
            rgba(195, 195, 195, 0.55) 75%, 
            rgba(175, 175, 175, 0.45) 100%);
          border-radius: 50%;
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.12),
            inset 0 3px 6px rgba(255, 255, 255, 0.7),
            inset 0 -3px 6px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f5f5f5;
        }

        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Selection styling */
        ::selection {
          background: black;
          color: white;
        }

        ::-moz-selection {
          background: black;
          color: white;
        }

        /* Easing utility */
        .ease-out-quint {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  )
}