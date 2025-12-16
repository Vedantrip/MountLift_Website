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
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
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
            className="inline-flex items-center px-10 py-5 bg-black text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800"
          >
            Start a Campaign
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-20">
            How We Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="w-14 h-14 mb-6 rounded-xl bg-black flex items-center justify-center">
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
      <section className="py-24 px-6 bg-black text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Launch Your First Campaign?
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10">
          Whether you’re testing influencer marketing or scaling it,
          we’ll help you do it the right way.
        </p>

        <Link
          href="/#contact"
          className="inline-flex items-center px-10 py-5 bg-white text-black rounded-full font-medium transition-all duration-300 hover:bg-gray-200"
        >
          Contact Us
          <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </section>
    </div>
  )
}