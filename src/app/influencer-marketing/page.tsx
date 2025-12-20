'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Target, TrendingUp, Users, BarChart3, ChevronRight } from 'lucide-react'

export default function InfluencerMarketingPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'Strategy & Planning',
      description: 'We design influencer campaigns aligned with your brand goals, audience, and budget.',
      icon: Target
    },
    {
      title: 'Creator Discovery',
      description: 'We identify creators who genuinely resonate with your target audience.',
      icon: Users
    },
    {
      title: 'Campaign Execution',
      description: 'From outreach to delivery, we manage the entire campaign lifecycle.',
      icon: TrendingUp
    },
    {
      title: 'Performance Tracking',
      description: 'Clear metrics, reporting, and insights to measure real impact.',
      icon: BarChart3
    }
  ]

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">

      {/* Floating Glossy Bubbles */}
      <div
        className="absolute top-32 left-10 w-32 h-32 glossy-bubble floating-element-slow"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
      <div
        className="absolute top-40 right-20 w-24 h-24 glossy-bubble-lg floating-element"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      />
      <div
        className="absolute bottom-40 left-20 w-40 h-40 glossy-bubble floating-element-delayed"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      />
      <div
        className="absolute bottom-20 right-16 w-20 h-20 glossy-bubble-sm floating-element-slow"
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
      />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 relative z-10">
        <div className="max-w-5xl text-center">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            Influencer Marketing
            <br />
            That Feels Authentic
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            We help brands connect with creators who genuinely influence purchasing decisions,
            not just impressions.
          </p>

          <Link
            href="/#contact"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full font-medium transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
          >
            Start a Campaign
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
            How We Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, i) => {
              const Icon = item.icon
              const colors = [
                'from-indigo-600 to-indigo-500',
                'from-violet-600 to-violet-500',
                'from-orange-600 to-orange-500',
                'from-cyan-600 to-cyan-500'
              ]
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${colors[i]} flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 10px 30px -5px ${colors[i].includes('indigo') ? 'rgba(99, 102, 241, 0.3)' : colors[i].includes('violet') ? 'rgba(139, 92, 246, 0.3)' : colors[i].includes('orange') ? 'rgba(249, 115, 22, 0.3)' : 'rgba(6, 182, 212, 0.3)'}` }}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Ready to Launch Your First Campaign?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Whether you're testing influencer marketing or scaling it,
          we'll help you do it the right way.
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full font-medium transition-all duration-300 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40"
        >
          Contact Us
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </section>

      <style jsx>{`
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
        .floating-element { animation: float 8s ease-in-out infinite; }
        .floating-element-slow { animation: float-slow 12s ease-in-out infinite; }
        .floating-element-delayed { animation: float-delayed 10s ease-in-out infinite; animation-delay: 2s; }
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
      `}</style>
    </div>
  )
}