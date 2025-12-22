'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Instagram, Linkedin, Mail, ArrowUpRight, Menu, X, Target, TrendingUp, Lightbulb, Users, ChevronRight, Calculator, Camera, Video, BarChart3, DollarSign, Hash, Calendar, Download, Zap, Globe, Palette, Music, FileText, Star, TrendingUp as Analytics, Shield, Clock, Award, ChevronDown, MessageCircle, ArrowUp } from 'lucide-react'
import Link from 'next/link'

export default function MountLift() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  
  // State for Form
  const [countryCode, setCountryCode] = useState('+1')
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
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'validation'>('idle')
  const [activeBenefit, setActiveBenefit] = useState<number | null>(null)
  
  // Scroll to top state
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  // FAQ state
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Refs for Scroll Animations
  const heroRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const caseStudiesRef = useRef<HTMLDivElement>(null)
  const exclusiveRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const creatorRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaButtonRef = useRef<HTMLAnchorElement>(null)
  const [showPopup, setShowPopup] = useState(false)

  // Accent color - vibrant professional palette
  const accentColor = '#6366F1' // Indigo-500
  const accentHover = '#4F46E5' // Indigo-600

  // List of common country codes with flags
  const countryCodes = [
    { code: '+1', country: '🇺🇸/🇨🇦 US/CA' },
    { code: '+7', country: '🇷🇺/🇰🇿 RU/KZ' },
    { code: '+20', country: '🇪🇬 EG' },
    { code: '+27', country: '🇿🇦 ZA' },
    { code: '+30', country: '🇬🇷 GR' },
    { code: '+31', country: '🇳🇱 NL' },
    { code: '+32', country: '🇧🇪 BE' },
    { code: '+33', country: '🇫🇷 FR' },
    { code: '+34', country: '🇪🇸 ES' },
    { code: '+39', country: '🇮🇹 IT' },
    { code: '+40', country: '🇷🇴 RO' },
    { code: '+41', country: '🇨🇭 CH' },
    { code: '+44', country: '🇬🇧 UK' },
    { code: '+49', country: '🇩🇪 DE' },
    { code: '+52', country: '🇲🇽 MX' },
    { code: '+55', country: '🇧🇷 BR' },
    { code: '+60', country: '🇲🇾 MY' },
    { code: '+61', country: '🇦🇺 AU' },
    { code: '+62', country: '🇮🇩 ID' },
    { code: '+63', country: '🇵🇭 PH' },
    { code: '+64', country: '🇳🇿 NZ' },
    { code: '+65', country: '🇸🇬 SG' },
    { code: '+66', country: '🇹🇭 TH' },
    { code: '+81', country: '🇯🇵 JP' },
    { code: '+82', country: '🇰🇷 KR' },
    { code: '+84', country: '🇻🇳 VN' },
    { code: '+86', country: '🇨🇳 CN' },
    { code: '+90', country: '🇹🇷 TR' },
    { code: '+91', country: '🇮🇳 IN' },
    { code: '+92', country: '🇵🇰 PK' },
    { code: '+94', country: '🇱🇰 LK' },
    { code: '+95', country: '🇲🇲 MM' },
    { code: '+98', country: '🇮🇷 IR' },
    { code: '+212', country: '🇲🇦 MA' },
    { code: '+234', country: '🇳🇬 NG' },
    { code: '+254', country: '🇰🇪 KE' },
    { code: '+351', country: '🇵🇹 PT' },
    { code: '+353', country: '🇮🇪 IE' },
    { code: '+358', country: '🇫🇮 FI' },
    { code: '+380', country: '🇺🇦 UA' },
    { code: '+420', country: '🇨🇿 CZ' },
    { code: '+48', country: '🇵🇱 PL' },
    { code: '+852', country: '🇭🇰 HK' },
    { code: '+886', country: '🇹🇼 TW' },
    { code: '+966', country: '🇸🇦 SA' },
    { code: '+971', country: '🇦🇪 UAE' },
    { code: '+972', country: '🇮🇱 IL' },
  ].sort((a, b) => parseInt(a.code.replace('+', '')) - parseInt(b.code.replace('+', '')))

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)
      setShowScrollTop(currentScrollY > 500)
      
      // Check which sections are visible
      const sections = [
        { ref: benefitsRef, id: 'benefits' },
        { ref: caseStudiesRef, id: 'caseStudies' },
        { ref: exclusiveRef, id: 'exclusive' },
        { ref: toolsRef, id: 'tools' },
        { ref: creatorRef, id: 'creator' },
        { ref: faqRef, id: 'faq' },
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

  // Strict Validation Handler
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Name: Only allow letters and spaces
    if (name === 'name') {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '')
      setFormData(prev => ({ ...prev, [name]: lettersOnly }))
      return
    }

    // Phone: Only allow numbers
    if (name === 'phone') {
      const numbersOnly = value.replace(/\D/g, '')
      setFormData(prev => ({ ...prev, [name]: numbersOnly }))
      return
    }

    // Default handler for email and message
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    // Strict Phone Length Validation
    if (formData.phone.length < 10) {
      setStatus('validation')
      setShowPopup(true)
      setLoading(false)
      return
    }

    // Combine country code and phone for submission
    const finalData = {
      ...formData,
      phone: `${countryCode} ${formData.phone}`
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
      setShowPopup(true)

      // auto close popup after 4 seconds (unless error)
      if (status !== 'error' && status !== 'validation') {
        setTimeout(() => setShowPopup(false), 4000)
      }
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
      color: 'from-indigo-600 to-indigo-500'
    },
    {
      title: 'Industry-Specific Expertise',
      short: 'Deep understanding across multiple verticals.',
      long: `Our team brings hands-on exposure across fashion, beauty, tech,
lifestyle, and emerging consumer brands. This allows us to anticipate trends,
understand platform nuances, and design campaigns that resonate naturally
within each industry ecosystem.`,
      icon: TrendingUp,
      color: 'from-violet-600 to-violet-500'
    },
    {
      title: 'Consumer-Centric & Content-Driven',
      short: 'Authentic content that drives engagement.',
      long: `We focus on storytelling that feels organic, not promotional.
By aligning creators with audience psychology and platform behavior, we
ensure content feels native, relatable, and trust-driven — resulting in
higher engagement and stronger brand recall.`,
      icon: Lightbulb,
      color: 'from-orange-600 to-orange-500'
    },
    {
      title: 'Passionate & Top-Tier Team',
      short: 'A team obsessed with brand growth.',
      long: `Our team is built around strategists, creator managers, and analysts
who live and breathe the creator economy. We work as an extension of your brand,
constantly optimizing campaigns, monitoring performance, and pushing creative
boundaries.`,
      icon: Users,
      color: 'from-cyan-600 to-cyan-500'
    }
  ]

  const creatorTools = [
    {
      title: 'Engagement Rate Calculator',
      description: 'Calculate your true engagement rate across all platforms.',
      icon: Calculator,
      color: 'from-indigo-600 to-indigo-500',
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
      color: 'from-orange-600 to-orange-500',
      category: 'Monetization'
    },
    {
      title: 'Media Kit Builder',
      description: 'Create professional media kits with your stats.',
      icon: FileText,
      color: 'from-emerald-600 to-emerald-500',
      category: 'Professional'
    },
    {
      title: 'Content Idea Generator',
      description: 'Never run out of content ideas with AI.',
      icon: Lightbulb,
      color: 'from-violet-600 to-violet-500',
      category: 'Planning'
    },
    {
      title: 'Video Editing Tools',
      description: 'Professional video templates for social media.',
      icon: Video,
      color: 'from-cyan-600 to-cyan-500',
      category: 'Creation'
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden font-sans selection:bg-indigo-500 selection:text-white">
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
            <Link href="/" className="text-2xl font-bold tracking-tight transition-all duration-300 hover:tracking-wider bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent hover:from-indigo-700 hover:via-violet-700 hover:to-pink-600">
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
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {item}
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-500 group-hover:w-full transform -translate-x-1/2"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
              <button 
                className="lg:hidden p-2 transition-all duration-300 hover:text-gray-600 active:scale-95"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in-up">
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
                  className="block text-sm font-light py-2 hover:text-gray-600 transition-colors active:text-indigo-600"
                  onClick={() => setMobileMenuOpen(false)}
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
        {/* Gradient Blur Background - Optimized for mobile */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-pink-500/10 blur-[60px] md:blur-[100px] rounded-full"></div>
          <div className="hidden md:block absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 blur-[80px] rounded-full"></div>
        </div>

        {/* Glossy Floating Bubbles - Hidden on Mobile for performance */}
        <div 
          className="hidden md:block absolute top-20 left-10 w-32 h-32 glossy-bubble floating-element-slow" 
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        ></div>
        <div 
          className="hidden md:block absolute top-40 right-20 w-24 h-24 glossy-bubble-lg floating-element-delayed" 
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div 
          className="hidden md:block absolute bottom-32 left-20 w-40 h-40 glossy-bubble floating-element" 
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        ></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 
            ref={headlineRef}
            className="text-4xl md:text-5xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight transition-all duration-1000 ease-out-quint"
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
            className="text-base md:text-lg lg:text-xl text-gray-600 mb-12 max-w-3xl mx-auto font-light tracking-wide leading-relaxed"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            MountLift is a data-driven influencer marketing agency that connects premium brands 
            with authentic creators to drive measurable results and meaningful engagement.
          </p>
          
          {/* RESPONSIVE BUTTON with Active State */}
          <div className="flex justify-center px-4 sm:px-0 w-full sm:w-auto">
            <a 
              href="mailto:mountliftagency@gmail.com?subject=Book a Campaign Call"
              ref={ctaButtonRef}
              onClick={createRipple}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative inline-block w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white font-medium rounded-full transition-all duration-500 transform overflow-hidden group text-center shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
              style={{
                transform: `translate(${magneticButton.x}px, ${magneticButton.y}px) scale(${visibleSections.has('hero') ? 1 : 0.95})`,
                transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease'
              }}
            >
              <span className="relative z-10 flex items-center justify-center">
                Book a Campaign Call
                <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
          </div>
        </div>
      </section>

      {/* Platform Marquee Section */}
      <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-400 mb-8 tracking-widest uppercase">
            Optimized for all major platforms
          </p>
          <div className="relative flex overflow-x-hidden group">
            <div className="flex animate-marquee whitespace-nowrap gap-16 items-center">
              {[1, 2, 3, 4].map((i) => (
                <React.Fragment key={i}>
                  <span className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2"><Instagram className="w-5 h-5 md:w-6 md:h-6"/> Instagram</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2"><Music className="w-5 h-5 md:w-6 md:h-6"/> TikTok</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2"><Video className="w-5 h-5 md:w-6 md:h-6"/> YouTube</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2"><Linkedin className="w-5 h-5 md:w-6 md:h-6"/> LinkedIn</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-300 flex items-center gap-2"><MessageCircle className="w-5 h-5 md:w-6 md:h-6"/> Snapchat</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Key Benefits Cards (Mobile Responsive) */}
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
                  // Added active:scale-95 for touch feedback
                  className="group relative h-[420px] bg-white rounded-[2rem] border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-gray-200 active:scale-95"
                >
                  <div 
                    className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 blur-[80px] transition-opacity duration-700 pointer-events-none rounded-full translate-x-1/3 -translate-y-1/3`} 
                  />

                  {/* Main Content */}
                  <div className="absolute inset-0 p-8 flex flex-col h-full z-10">
                    <div className="mb-auto">
                      <div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-8 shadow-sm group-hover:scale-90 group-hover:shadow-md transition-all duration-500`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 pr-4">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:opacity-20 transition-opacity duration-500">
                        {benefit.short}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-gray-50 mt-auto group-hover:opacity-20 transition-opacity duration-500">
                      <div className="text-xs font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2">
                        Our Focus <ChevronRight className="w-3 h-3 md:hidden" /> {/* Added hint for mobile */}
                      </div>
                    </div>
                  </div>

                  {/* Slide-Up Drawer */}
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

      {/* Our Work / Campaign Roadmap */}
      <section id="our-work" ref={caseStudiesRef} className="py-32 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className={`text-4xl lg:text-6xl font-bold mb-6 tracking-tight transition-all duration-700 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent ${
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
            {/* Desktop Horizontal Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -z-10"></div>
            
            {/* Mobile Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-100 to-pink-100 lg:hidden -z-10"></div>

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
                className={`relative bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 group active:scale-95 ${
                  visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/30 relative z-10">
                  {item.step}
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed text-sm">
                  {item.desc}
                </p>

                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10"></div>
              </div>
            ))}
          </div>

          <div 
            className={`mt-20 text-center transition-all duration-1000 delay-500 ${
              visibleSections.has('caseStudies') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
             <div className="inline-block p-1 rounded-full bg-gradient-to-r from-indigo-100 via-violet-100 to-pink-100">
               <a 
                 href="mailto:mountliftagency@gmail.com"
                 className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 inline-flex items-center gap-2 group shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent"
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
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-violet-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Talent Management</h3>
              <p className="text-gray-600 leading-relaxed">Comprehensive management services for top creators focusing on growth and brand partnerships.</p>
            </div>
            
            <div
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Brand Partnerships</h3>
              <p className="text-gray-600 leading-relaxed">Strategic connections between premium brands and vetted content creators.</p>
            </div>
            
            <div
              className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
              style={{
                opacity: visibleSections.has('exclusive') ? 1 : 0,
                transform: visibleSections.has('exclusive') ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Strategy</h3>
              <p className="text-gray-600 leading-relaxed">Data-driven strategies to maximize creator potential and brand ROI.</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="#contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-lg shadow-indigo-500/30 active:scale-95"
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent"
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

          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {creatorTools.map((tool, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden h-full flex flex-col justify-between active:scale-95"
                  style={{
                    opacity: visibleSections.has('tools') ? 1 : 0,
                    transform: visibleSections.has('tools') ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                  }}
                >
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
        </div>
      </section>

      {/* NEW: Creator Callout (Before FAQ) */}
      <section ref={creatorRef} className="bg-black text-white py-16 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-50"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10"
             style={{
               opacity: visibleSections.has('creator') ? 1 : 0,
               transform: visibleSections.has('creator') ? 'translateY(0)' : 'translateY(20px)',
               transition: 'all 0.8s ease-out'
             }}>
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Are you a Creator?</h3>
            <p className="text-gray-400 text-sm">Join our exclusive network and work with premium brands.</p>
          </div>
          <Link 
            href="mailto:mountliftagency@gmail.com?subject=Apply to Join as a Creator"
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all active:scale-95"
          >
            <span>Apply to Join</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* NEW: FAQ Section */}
      <section ref={faqRef} className="py-24 px-6 lg:px-8 bg-white border-t border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 
            className="text-4xl font-bold text-center mb-12 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent"
            style={{
              opacity: visibleSections.has('faq') ? 1 : 0,
              transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "What industries do you specialize in?", a: "We primarily focus on Fashion, Beauty, Lifestyle, and Tech, but our data-driven approach allows us to adapt to any niche effectively." },
              { q: "Do you work with micro or macro influencers?", a: "We work with a full spectrum of creators. We believe in a mix: macro for awareness and micro/nano for high engagement and conversion." },
              { q: "How do you measure campaign success?", a: "We look beyond vanity metrics (likes). We track CPM, CPA, conversion rates, and sentiment analysis to ensure real ROI." },
              { q: "What is the typical campaign timeline?", a: "From strategy to execution, a typical campaign takes 4-6 weeks. However, we can expedite this based on your specific launch needs." }
            ].map((faq, i) => (
              <div
                key={i}
                className="group"
                style={{
                  opacity: visibleSections.has('faq') ? 1 : 0,
                  transform: visibleSections.has('faq') ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.2 + i * 0.1}s`
                }}
              >
                <div
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className={`
                    border rounded-2xl p-6 cursor-pointer transition-all duration-500 ease-out active:scale-[0.99]
                    ${openFAQ === i 
                      ? 'border-indigo-300 bg-gradient-to-br from-indigo-50/50 via-violet-50/30 to-pink-50/50 shadow-lg shadow-indigo-500/10' 
                      : 'border-gray-200 bg-white hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/5'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`
                      font-semibold text-lg pr-8 transition-colors duration-300
                      ${openFAQ === i ? 'text-indigo-700' : 'text-gray-900 group-hover:text-indigo-600'}
                    `}>
                      {faq.q}
                    </h3>
                    <div className={`
                      flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500
                      ${openFAQ === i 
                        ? 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white rotate-180 shadow-lg shadow-indigo-500/30' 
                        : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                      }
                    `}>
                      <ChevronDown className="w-5 h-5 transition-transform duration-500" />
                    </div>
                  </div>
                  <div
                    className={`
                      overflow-hidden transition-all duration-500 ease-out
                      ${openFAQ === i ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 mt-0 opacity-0'}
                    `}
                  >
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

      {/* Social Media & Contact */}
      <section id="contact" ref={contactRef} className="py-32 px-6 lg:px-8 bg-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div 
            className={`text-center mb-24 transition-all duration-1000 ${
              visibleSections.has('contact') 
                ? 'animate-fade-in-up opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            <h2 className="text-4xl font-bold mb-12 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">Our Social Media Handles</h2>
            <div className="flex justify-center space-x-10">
              <a
                href="https://www.instagram.com/mount.lift/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 group active:scale-95"
              >
                <Instagram className="w-8 h-8" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://www.linkedin.com/company/mountlift-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-5 rounded-full bg-blue-600 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 group active:scale-95"
              >
                <Linkedin className="w-8 h-8" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>

          {/* UPDATED CONTACT FORM */}
          <div 
            className={`text-center transition-all duration-1000 ${
              visibleSections.has('contact') 
                ? 'animate-fade-in-up opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="text-4xl font-bold mb-6 tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">Contact</h2>
            <p className="text-gray-600 mb-16 font-light tracking-wide">Reach out to us if you need any support.</p>
            
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  minLength={2}
                  className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-indigo-500/20 font-light rounded-xl"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-indigo-500/20 font-light rounded-xl"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-full px-4 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:outline-none appearance-none pr-8 cursor-pointer font-light min-w-[140px] rounded-xl"
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} {c.country.split(' ')[0]}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  minLength={10}
                  maxLength={15}
                  className="flex-1 px-6 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-indigo-500/20 font-light rounded-xl"
                />
              </div>

              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleFormChange}
                rows={6}
                className="w-full px-6 py-4 bg-white border border-gray-200 focus:border-indigo-500 focus:outline-none transition-all duration-500 focus:ring-2 focus:ring-indigo-500/20 resize-none font-light rounded-xl"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30 rounded-full active:scale-95"
              >
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
                <h3 className="text-2xl font-bold mb-4 text-green-600">✅ Thank You!</h3>
                <p className="text-gray-600 mb-6">Your message was sent successfully. We’ll get back to you shortly.</p>
              </>
            )}
            {status === 'error' && (
              <>
                <h3 className="text-2xl font-bold mb-4 text-red-600">❌ Something went wrong</h3>
                <p className="text-gray-600 mb-6">We couldn’t send your message right now. Please try again later.</p>
              </>
            )}
            {status === 'validation' && (
              <>
                <h3 className="text-2xl font-bold mb-4 text-orange-600">⚠️ Invalid Input</h3>
                <p className="text-gray-600 mb-6">Please enter a valid phone number (at least 10 digits).</p>
              </>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg shadow-indigo-500/30 active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-2xl transition-all duration-300 z-50 hover:bg-indigo-700 hover:scale-110 active:scale-95 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4 tracking-tight bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">MOUNTLIFT</div>
              <p className="text-sm text-gray-300 font-light tracking-wide">Elevating brands through authentic influencer partnerships</p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex space-x-10">
                <Link href="/privacy" className="text-sm font-light hover:text-white transition-colors duration-300">Privacy</Link>
                <Link href="/privacy" className="text-sm font-light hover:text-white transition-colors duration-300">Terms</Link>
                <Link href="/work-in-progress" className="text-sm font-light hover:text-white transition-colors duration-300">Careers</Link>
              </div>
              <div className="flex space-x-8">
                <a 
                  href="https://www.instagram.com/mount.lift/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 rounded-full hover:bg-gradient-to-r hover:from-purple-500 hover:via-pink-500 hover:to-orange-500 hover:border-transparent transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/mountlift-agency/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-white/20 rounded-full hover:bg-indigo-600 hover:border-transparent transition-all duration-300 hover:scale-110 active:scale-95"
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
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-slide {
          from { opacity: 0; transform: translateY(5%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes card-enter {
          from { opacity: 0; transform: translateY(40px) rotate(2deg); }
          to { opacity: 1; transform: translateY(0) rotate(0.5deg); }
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
        @keyframes ripple {
          0% { width: 0; height: 0; opacity: 0.5; }
          100% { width: 100px; height: 100px; opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-hero-slide { animation: hero-slide 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-hero-fade { animation: hero-fade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-card-enter { animation: card-enter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .animate-ripple { animation: ripple 0.6s ease-out forwards; }
        .floating-element { animation: float 8s ease-in-out infinite; }
        .floating-element-slow { animation: float-slow 12s ease-in-out infinite; }
        .floating-element-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 3s; }
        .glossy-bubble {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 240, 0.8) 25%, rgba(220, 220, 220, 0.7) 50%, rgba(200, 200, 200, 0.6) 75%, rgba(180, 180, 180, 0.5) 100%);
          border-radius: 50%;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .glossy-bubble-sm {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.85) 25%, rgba(230, 230, 230, 0.75) 50%, rgba(210, 210, 210, 0.65) 75%, rgba(190, 190, 190, 0.55) 100%);
          border-radius: 50%;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08), inset 0 2px 3px rgba(255, 255, 255, 0.9), inset 0 -2px 3px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .glossy-bubble-lg {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(235, 235, 235, 0.75) 25%, rgba(215, 215, 215, 0.65) 50%, rgba(195, 195, 195, 0.55) 75%, rgba(175, 175, 175, 0.45) 100%);
          border-radius: 50%;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), inset 0 3px 6px rgba(255, 255, 255, 0.7), inset 0 -3px 6px rgba(0, 0, 0, 0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #555; }
        html { scroll-behavior: smooth; }
        ::selection { background: #6366F1; color: white; }
        ::-moz-selection { background: #6366F1; color: white; }
        .ease-out-quint { animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>
    </div>
  )
}