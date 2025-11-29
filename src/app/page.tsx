'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Phone,
  Instagram,
  Linkedin,
  ChevronRight,
  Menu,
  X,
  Target,
  TrendingUp,
  Lightbulb,
  Users,
} from 'lucide-react'
import Link from 'next/link'

export default function MountLift() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])
  const [headlineOpacity, setHeadlineOpacity] = useState(1)
  const [scrollY, setScrollY] = useState(0)
  const [magneticButton, setMagneticButton] = useState({ x: 0, y: 0 })
  const [sending, setSending] = useState(false)

  const benefitsRef = useRef<HTMLDivElement>(null)
  const caseStudiesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaButtonRef = useRef<HTMLButtonElement>(null)

  const navItems = [
    { label: 'Influencer Marketing', href: '#hero' },
    { label: 'Tools for Creators', href: '#benefits' },
    { label: 'Exclusive Representation', href: '#benefits' },
    { label: 'Our Work', href: '#our-work' },
    { label: 'About Us', href: '/about-us' }, // separate page
    { label: 'Contact', href: '#contact' },
  ]

  const benefits = [
    {
      title: 'Focused Campaign Design',
      description: 'Strategic influencer campaigns tailored to your brand objectives and target audience.',
      icon: Target,
      color: 'from-slate-600 to-slate-500',
    },
    {
      title: 'Industry-Specific Expertise',
      description: 'Deep knowledge across fashion, beauty, tech, lifestyle, and emerging markets.',
      icon: TrendingUp,
      color: 'from-zinc-600 to-zinc-500',
    },
    {
      title: 'Consumer-Centric & Content-Driven',
      description: 'Creating authentic content that resonates with your audience and drives engagement.',
      icon: Lightbulb,
      color: 'from-stone-600 to-stone-500',
    },
    {
      title: 'Passionate & Top-Tier Team',
      description: 'Dedicated professionals committed to elevating your brand through influencer partnerships.',
      icon: Users,
      color: 'from-neutral-600 to-neutral-500',
    },
  ]

  const caseStudies = [
    {
      brand: 'LUXE BEAUTY',
      description: 'Launched new product line with 15 luxury lifestyle influencers',
      metrics: '2.3M Reach • 12% Engagement Rate',
    },
    {
      brand: 'TECH FORWARD',
      description: 'Tech product launch through micro-influencer network',
      metrics: '1.8M Reach • 8% Conversion Rate',
    },
    {
      brand: 'URBAN STYLE',
      description: 'Fashion campaign with street style influencers',
      metrics: '3.1M Reach • 15% Engagement Rate',
    },
  ]

  useEffect(() => {
    const checkBubbleCollision = () => {
      if (!headlineRef.current) return

      const headlineRect = headlineRef.current.getBoundingClientRect()
      const bubbles = document.querySelectorAll('.glossy-bubble, .glossy-bubble-sm, .glossy-bubble-lg')

      let hasCollision = false

      bubbles.forEach((bubble) => {
        const bubbleRect = bubble.getBoundingClientRect()

        if (
          bubbleRect.left < headlineRect.right &&
          bubbleRect.right > headlineRect.left &&
          bubbleRect.top < headlineRect.bottom &&
          bubbleRect.bottom > headlineRect.top
        ) {
          hasCollision = true
        }
      })

      setHeadlineOpacity(hasCollision ? 0.3 : 1)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)

      const sections = [
        { ref: heroRef, id: 'hero' },
        { ref: benefitsRef, id: 'benefits' },
        { ref: caseStudiesRef, id: 'caseStudies' },
        { ref: contactRef, id: 'contact' },
      ]

      sections.forEach(({ ref, id }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0

          setVisibleSections((prev) => {
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

      checkBubbleCollision()
    }

    const handleResize = () => {
      checkBubbleCollision()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    handleScroll() // initial

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // ---- UPDATED: submits to /api/contact ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // success
        alert('Message sent — thanks!')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        // server responded but with error
        const errMsg = data?.error || data?.message || 'Unknown error'
        alert('Error sending message: ' + errMsg)
        console.error('Contact API error:', data)
      }
    } catch (err) {
      console.error('Network error sending contact:', err)
      alert('Network error sending contact — please try again.')
    } finally {
      setSending(false)
    }
  }

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y,
    }

    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
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

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Sticky Navbar (more transparent now) */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-xl'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* LOGO with mountain-ridge arrow */}
            <Link
              href="/"
              className="relative inline-flex items-center group"
            >
              <span className="relative z-10 text-2xl font-bold tracking-tight transition-all duration-300 group-hover:tracking-wider group-hover:text-gray-700">
                MountLift
              </span>

              {/* Arrow / mountain ridges behind logo */}
              <span className="pointer-events-none absolute inset-x-0 -bottom-3 flex justify-center">
                <svg
                  className="w-16 h-4 text-gray-900/70 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-y-110"
                  viewBox="0 0 64 16"
                  aria-hidden="true"
                >
                  {/* Mountain ridges */}
                  <polyline
                    points="2,12 8,4 14,10 20,3 26,11 32,5 38,12 44,6 50,11 56,7 62,12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Arrow head to the right */}
                  <polyline
                    points="56,7 60,5 58,9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative text-sm font-light tracking-wide transition-all duration-300 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent transition-all duration-500 group-hover:w-full transform -translate-x-1/2"></span>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <a
                href="tel:+911234567890"
                className="group relative px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-full hover:from-gray-800 hover:to-gray-700 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-gray-500/25"
              >
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-semibold tracking-wide">Call Us</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                className="lg:hidden p-2 transition-all duration-300 hover:text-gray-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu (partially opaque) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/85 backdrop-blur-lg border-t border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block text-sm font-light py-2 hover:text-gray-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 lg:px-8 pt-24 relative bg-white overflow-hidden"
        >
          {/* Floating bubbles */}
          <div
            className="absolute top-20 left-10 w-32 h-32 glossy-bubble floating-element-slow"
            style={{
              transform: `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.01) * 20}px)`,
            }}
          ></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 glossy-bubble-lg floating-element-delayed"
            style={{
              transform: `translateY(${scrollY * 0.2}px) translateX(${Math.cos(scrollY * 0.01) * 15}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-32 left-20 w-40 h-40 glossy-bubble floating-element"
            style={{
              transform: `translateY(${scrollY * 0.4}px) translateX(${Math.sin(scrollY * 0.008) * 25}px)`,
            }}
          ></div>
          <div
            className="absolute bottom-20 right-10 w-20 h-20 glossy-bubble-sm floating-element-slow"
            style={{
              transform: `translateY(${scrollY * 0.25}px) translateX(${Math.cos(scrollY * 0.012) * 18}px)`,
            }}
          ></div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1
              ref={headlineRef}
              className="text-5xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight transition-all duration-1000 ease-out-quint"
              style={{
                opacity: headlineOpacity,
                transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(30px)',
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
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
              }}
            >
              MountLift is a data-driven influencer marketing agency that connects premium brands
              with authentic creators to drive measurable results and meaningful engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                ref={ctaButtonRef}
                onClick={createRipple}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative px-12 py-5 bg-black text-white font-medium rounded-full transition-all duration-500 transform overflow-hidden group"
                style={{
                  transform: `translate(${magneticButton.x}px, ${magneticButton.y}px) scale(${
                    visibleSections.has('hero') ? 1 : 0.95
                  })`,
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s ease',
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Book a Campaign Call
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="absolute bg-white/30 rounded-full animate-ripple"
                    style={{
                      left: ripple.x - 10,
                      top: ripple.y - 10,
                      width: 20,
                      height: 20,
                    }}
                  />
                ))}
              </button>
              <button
                className="px-12 py-5 border border-gray-800 font-light hover:bg-gray-800 hover:text-white transition-all duration-500 transform hover:scale-105 hover:shadow-lg"
                style={{
                  transform: `scale(${visibleSections.has('hero') ? 1 : 0.95})`,
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
                }}
              >
                For Creators
              </button>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

        {/* Key Benefits */}
        <section
          id="benefits"
          ref={benefitsRef}
          className="py-32 px-6 lg:px-8 bg-gray-50/50 relative"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className={`group p-8 bg-white border border-gray-100 hover:border-gray-300 transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 cursor-pointer ${
                      visibleSections.has('benefits')
                        ? 'animate-card-enter opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }`}
                    style={{
                      transitionDelay: `${index * 60}ms`,
                      transform: visibleSections.has('benefits')
                        ? `translateY(0) rotate(${index % 2 === 0 ? 0.5 : -0.5}deg)`
                        : 'translateY(48px) rotate(0deg)',
                    }}
                  >
                    <div
                      className={`relative w-16 h-16 mb-8 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-4 tracking-tight">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {benefit.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

        {/* Our Work */}
        <section id="our-work" ref={caseStudiesRef} className="py-32 px-6 lg:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <h2
              className={`text-5xl font-bold text-center mb-20 tracking-tight transition-all duration-1000 ${
                visibleSections.has('caseStudies')
                  ? 'animate-fade-in-up opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              OUR WORK
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-gray-50/30 border border-gray-100 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 cursor-pointer ${
                    visibleSections.has('caseStudies')
                      ? 'animate-card-enter opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: `${(index + 1) * 80}ms`,
                    transform: visibleSections.has('caseStudies')
                      ? `translateY(0) skew(${index % 2 === 0 ? -1 : 1}deg)`
                      : 'translateY(48px) skew(0deg)',
                  }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-gray-400">
                        {study.brand.charAt(0)}
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="text-xs font-bold tracking-widest mb-6 text-gray-500 uppercase transition-colors duration-300 group-hover:text-gray-700">
                      {study.brand}
                    </div>
                    <p className="text-gray-600 mb-8 font-light leading-relaxed transition-colors duration-300 group-hover:text-gray-800">
                      {study.description}
                    </p>
                    <div className="text-xs text-gray-500 border-t border-gray-200 pt-6 font-light transition-colors duration-300 group-hover:text-gray-700">
                      {study.metrics}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <p className="text-white text-sm font-light">View Case Study →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>

        {/* Contact + Socials */}
        <section
          id="contact"
          ref={contactRef}
          className="py-32 px-6 lg:px-8 bg-gray-100 relative overflow-hidden"
        >
          {/* Floating decorative elements */}
          <div
            className="absolute top-10 left-10 w-20 h-20 glossy-bubble floating-element"
            style={{
              transform: `translateY(${scrollY * 0.2}px) translateX(${Math.sin(scrollY * 0.01) * 15}px)`,
            }}
          ></div>
          <div
            className="absolute top-32 right-20 w-16 h-16 glossy-bubble-sm floating-element-slow"
            style={{
              transform: `translateY(${scrollY * 0.15}px) translateX(${Math.cos(scrollY * 0.01) * 12}px)`,
            }}
          ></div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Socials */}
            <div
              className={`text-center mb-24 transition-all duration-1000 ${
                visibleSections.has('contact')
                  ? 'animate-fade-in-up opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="text-4xl font-bold mb-12 tracking-tight">
                Our Social Media Handles
              </h2>
              <div className="flex justify-center space-x-10">
                <a
                  href="#"
                  className="relative p-5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 group"
                  aria-label="Visit our Instagram"
                >
                  <Instagram className="w-8 h-8" />
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </a>
                <a
                  href="#"
                  className="relative p-5 rounded-full bg-blue-600 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 group"
                  aria-label="Visit our LinkedIn"
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
              <p className="text-gray-600 mb-16 font-light tracking-wide">
                Reach out to us if you need any support.
              </p>

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
                  disabled={sending}
                  className="w-full md:w-auto px-12 py-5 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-500 transform hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="text-2xl font-bold mb-4 tracking-tight">MountLift</div>
              <p className="text-sm text-gray-400 font-light tracking-wide">
                Elevating brands through authentic influencer partnerships
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
              <div className="flex space-x-10">
                <Link
                  href="#"
                  className="text-sm font-light hover:text-white transition-colors duration-300"
                >
                  Privacy
                </Link>
                <Link
                  href="#"
                  className="text-sm font-light hover:text-white transition-colors duration-300"
                >
                  Terms
                </Link>
                <Link
                  href="#"
                  className="text-sm font-light hover:text-white transition-colors duration-300"
                >
                  Careers
                </Link>
              </div>
              <div className="flex space-x-8">
                <a
                  href="#"
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
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
          0%,
          100% {
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
          0%,
          100% {
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
          0%,
          100% {
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

        .glossy-bubble,
        .glossy-bubble-sm,
        .glossy-bubble-lg {
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .glossy-bubble {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(240, 240, 240, 0.8) 25%,
            rgba(220, 220, 220, 0.7) 50%,
            rgba(200, 200, 200, 0.6) 75%,
            rgba(180, 180, 180, 0.5) 100%
          );
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .glossy-bubble-sm {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.95) 0%,
            rgba(245, 245, 245, 0.85) 25%,
            rgba(230, 230, 230, 0.75) 50%,
            rgba(210, 210, 210, 0.65) 75%,
            rgba(190, 190, 190, 0.55) 100%
          );
          box-shadow:
            0 6px 24px rgba(0, 0, 0, 0.08),
            inset 0 2px 3px rgba(255, 255, 255, 0.9),
            inset 0 -2px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .glossy-bubble-lg {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.85) 0%,
            rgba(235, 235, 235, 0.75) 25%,
            rgba(215, 215, 215, 0.65) 50%,
            rgba(195, 195, 195, 0.55) 75%,
            rgba(175, 175, 175, 0.45) 100%
          );
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.12),
            inset 0 3px 6px rgba(255, 255, 255, 0.7),
            inset 0 -3px 6px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }

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

        html {
          scroll-behavior: smooth;
        }

        ::selection {
          background: black;
          color: white;
        }

        ::-moz-selection {
          background: black;
          color: white;
        }

        .ease-out-quint {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  )
}