'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Target, Users, TrendingUp, Award, Lightbulb, Globe, Heart, Shield, Zap, Instagram, Linkedin, Sparkles, BarChart3, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default function AboutUs() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [scrollY, setScrollY] = useState(0)

  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const approachRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 20)
      setScrollY(currentScrollY)
      
      // Check which sections are visible
      const sections = [
        { ref: missionRef, id: 'mission' },
        { ref: valuesRef, id: 'values' },
        { ref: approachRef, id: 'approach' },
        { ref: teamRef, id: 'team' }
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
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const values = [
    {
      title: 'Authenticity First',
      description: 'We believe in genuine connections between brands and creators, fostering relationships that feel natural and resonate with audiences.',
      icon: Heart,
      color: 'from-rose-600 to-rose-500'
    },
    {
      title: 'Data-Driven Excellence',
      description: 'Our strategies are backed by comprehensive analytics and insights, ensuring every campaign delivers measurable results.',
      icon: TrendingUp,
      color: 'from-blue-600 to-blue-500'
    },
    {
      title: 'Creative Innovation',
      description: 'We push boundaries with fresh ideas and cutting-edge approaches that capture attention and drive engagement.',
      icon: Lightbulb,
      color: 'from-yellow-600 to-yellow-500'
    },
    {
      title: 'Partnership Mindset',
      description: 'We view our clients as long-term partners, committed to their growth and success in the evolving digital landscape.',
      icon: Users,
      color: 'from-green-600 to-green-500'
    }
  ]

  const approach = [
    {
      title: 'Strategic Planning',
      description: 'Comprehensive campaign development with clear objectives and KPIs',
      stats: '10+ Campaigns'
    },
    {
      title: 'Creator Matching',
      description: 'AI-powered matching algorithm to find perfect brand-creator partnerships',
      stats: '100+ Creators'
    },
    {
      title: 'Performance Tracking',
      description: 'Real-time analytics and reporting for campaign optimization',
      stats: '95% Client Satisfaction'
    },
    {
      title: 'Content Excellence',
      description: 'Quality assurance and creative direction for compelling content',
      stats: '1k+ Reach Generated'
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

            {/* Back Button */}
            <Link 
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center px-6 lg:px-8 pt-24 relative bg-white overflow-hidden">
        {/* Floating decorative elements */}
        <div 
          className="absolute top-20 left-10 w-32 h-32 glossy-bubble floating-element-slow" 
          style={{ 
            transform: `translateY(${scrollY * 0.3}px) translateX(${Math.sin(scrollY * 0.01) * 20}px)` 
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-24 h-24 glossy-bubble-lg floating-element-delayed" 
          style={{ 
            transform: `translateY(${scrollY * 0.2}px) translateX(${Math.cos(scrollY * 0.01) * 15}px)` 
          }}
        ></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 
            className="text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight"
            style={{
              opacity: visibleSections.has('hero') ? 1 : 0,
              transform: visibleSections.has('hero') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
            }}
          >
            ABOUT
            <br />
            MOUNTLIFT
          </h1>
          <p 
            className="text-xl lg:text-2xl text-gray-600 mb-8 font-light leading-relaxed"
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

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <div>
              <h2 
                className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight"
                style={{
                  opacity: visibleSections.has('mission') ? 1 : 0,
                  transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
                }}
              >
                Our Mission
              </h2>
              <div 
                className="space-y-6 text-lg text-gray-600 leading-relaxed"
                style={{
                  opacity: visibleSections.has('mission') ? 1 : 0,
                  transform: visibleSections.has('mission') ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
                }}
              >
                <p>
                  At MountLift, we bridge the gap between exceptional brands and talented creators, 
                  fostering partnerships that transcend traditional advertising. Our mission is to 
                  revolutionize influencer marketing through data-driven strategies, authentic storytelling, 
                  and measurable results.
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
              <div className="absolute inset-0 bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden flex items-center justify-center p-8">
                {/* Decorative Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]" 
                  style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '30px 30px' }}>
                </div>
                
                {/* Connecting "DNA" Strands (SVG Lines) - FIXED */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="strandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#9ca3af" /> {/* Gray 400 */}
                      <stop offset="50%" stopColor="#6b7280" /> {/* Gray 500 */}
                      <stop offset="100%" stopColor="#9ca3af" />
                    </linearGradient>
                  </defs>
                  
                  {/* Strand to Top Left Card */}
                  <path 
                    d="M 50 50 Q 35 50 20 25" 
                    fill="none" 
                    stroke="#cbd5e1" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2"
                    className="opacity-70"
                  />
                  
                  {/* Strand to Top Right Card */}
                  <path 
                    d="M 50 50 Q 65 50 80 30" 
                    fill="none" 
                    stroke="#cbd5e1" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2" 
                    className="opacity-70"
                  />
                  
                  {/* Strand to Bottom Center Card */}
                  <path 
                    d="M 50 50 Q 50 70 50 85" 
                    fill="none" 
                    stroke="#cbd5e1" 
                    strokeWidth="0.5" 
                    strokeDasharray="2 2" 
                    className="opacity-70"
                  />
                </svg>

                {/* Central Bullseye / Nucleus */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                   <div className="relative flex items-center justify-center w-20 h-20 bg-black rounded-full shadow-2xl shadow-black/20 ring-4 ring-white">
                      <Target className="w-8 h-8 text-white" />
                      {/* Pulse Rings */}
                      <div className="absolute inset-0 rounded-full border border-gray-400 scale-150 animate-ping opacity-20"></div>
                      <div className="absolute inset-0 rounded-full border border-gray-300 scale-125 opacity-30"></div>
                   </div>
                </div>

                {/* Orbiting Card 1 (Top Left) - Connection */}
                <div className="absolute top-[15%] left-[5%] sm:left-[5%] bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float-slow z-30 max-w-[180px] sm:max-w-none">
                   <div className="w-10 h-10 bg-indigo-50 rounded-full flex shrink-0 items-center justify-center text-indigo-600">
                     <LinkIcon size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-medium tracking-wide">FOCUS</div>
                     <div className="font-bold text-sm">Authentic Connection</div>
                   </div>
                </div>

                {/* Orbiting Card 2 (Top Right) - Strategy */}
                <div className="absolute top-[20%] right-[5%] sm:right-[5%] bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float-delayed z-30 max-w-[180px] sm:max-w-none">
                   <div className="w-10 h-10 bg-blue-50 rounded-full flex shrink-0 items-center justify-center text-blue-600">
                     <BarChart3 size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-medium tracking-wide">INSIGHT</div>
                     <div className="font-bold text-sm">Data-Driven Strategy</div>
                   </div>
                </div>

                {/* Orbiting Card 3 (Bottom Center) - Creativity */}
                <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-float z-30 w-max">
                   <div className="w-10 h-10 bg-pink-50 rounded-full flex shrink-0 items-center justify-center text-pink-600">
                     <Sparkles size={20} />
                   </div>
                   <div>
                     <div className="text-xs text-gray-400 font-medium tracking-wide">STYLE</div>
                     <div className="font-bold text-sm">Creative Storytelling</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
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
              The principles that guide every decision we make and every partnership we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  opacity: visibleSections.has('values') ? 1 : 0,
                  transform: visibleSections.has('values') ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section ref={approachRef} className="py-20 px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
              style={{
                opacity: visibleSections.has('approach') ? 1 : 0,
                transform: visibleSections.has('approach') ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
              }}
            >
              Our Approach
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed"
              style={{
                opacity: visibleSections.has('approach') ? 1 : 0,
                transform: visibleSections.has('approach') ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              A systematic methodology that ensures exceptional results for every campaign.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {approach.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  opacity: visibleSections.has('approach') ? 1 : 0,
                  transform: visibleSections.has('approach') ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.3 + index * 0.1}s`
                }}
              >
                <div className="text-3xl font-bold text-black mb-4">{item.stats}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section ref={teamRef} className="py-20 px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="mb-12"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms'
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Globe className="w-12 h-12 text-white" />
            </div>
          </div>

          <h2 
            className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
            }}
          >
            Our Vision for the Future
          </h2>
          
          <div 
            className="space-y-6 text-xl text-gray-600 leading-relaxed mb-12"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
            }}
          >
            <p>
              We envision a future where marketing is not just about reaching audiences, but about 
              building communities. Where brands don't just sell products, but create meaningful 
              experiences that enrich people's lives.
            </p>
            <p>
              MountLift aims to be at the forefront of this evolution, continuously innovating 
              our approaches, embracing new technologies, and fostering partnerships that set new 
              standards for authenticity and effectiveness in influencer marketing.
            </p>
          </div>

          <div 
            className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl p-12 border border-gray-200"
            style={{
              opacity: visibleSections.has('team') ? 1 : 0,
              transform: visibleSections.has('team') ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s'
            }}
          >
            <h3 className="text-2xl font-bold mb-6">Join Our Journey</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're a brand looking to make an impact or a creator ready to amplify your voice, 
              we invite you to be part of something bigger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                href="/"
                className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
              >
                Start a Campaign
              </Link>
              <Link 
                href="/#tools"
                className="px-8 py-4 border border-gray-300 font-medium rounded-full hover:bg-gray-50 transition-all duration-300 text-center"
              >
                Explore Creator Tools
              </Link>
            </div>
            <div className="flex justify-center space-x-6">
              <a
                href="https://www.instagram.com/mount.lift/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 group"
              >
                <Instagram className="w-5 h-5" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://www.linkedin.com/company/mountlift-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-full bg-blue-600 text-white transition-all duration-500 transform hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30 group"
              >
                <Linkedin className="w-5 h-5" />
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
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

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        .floating-element-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        
        .floating-element-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
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

        .animation-delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  )
}