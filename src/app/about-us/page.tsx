'use client'

import React, { useEffect, useState } from 'react'
import { Users, Target, TrendingUp, Sparkles, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'
import MainNavbar from '@/components/MainNavbar'

type Step = {
  year: string
  title: string
  description: string
}

const roadmapSteps: Step[] = [
  {
    year: '2022',
    title: 'The Idea',
    description:
      'MountLift began as a small collective obsessed with authentic creator storytelling and measurable performance.',
  },
  {
    year: '2023',
    title: 'First Anchor Clients',
    description:
      'We signed our first premium lifestyle and tech brands, building repeatable influencer campaign playbooks.',
  },
  {
    year: '2024',
    title: 'Creator Network Expansion',
    description:
      'Our curated creator network grew across beauty, fashion, tech, and wellness verticals across India.',
  },
  {
    year: '2025',
    title: 'MountLift Today',
    description:
      'A focused influencer marketing agency helping brands design campaigns that feel native, human, and performance-led.',
  },
]

export default function AboutUsPage() {
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set())
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setHeroVisible(true)

    const handleScroll = () => {
      const newVisible = new Set<number>()

      roadmapSteps.forEach((_, index) => {
        const el = document.querySelector<HTMLElement>(`[data-step="${index}"]`)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.15
        if (inView) newVisible.add(index)
      })

      setVisibleSteps((prev) => {
        const merged = new Set(prev)
        newVisible.forEach((i) => merged.add(i))
        return merged
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <MainNavbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-16 lg:pt-32 lg:pb-24">
        {/* Hero */}
        <section className="grid gap-10 lg:grid-cols-[1.6fr,1.1fr] items-center mb-24 lg:mb-28">
          <div
            className={`transition-all duration-800 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-xs font-medium tracking-[0.25em] text-gray-500 mb-4 uppercase">
              ABOUT MountLift
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              We build campaigns where{' '}
              <span className="underline decoration-gray-900 decoration-[3px]">creators</span> and
              brands grow together.
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-xl">
              MountLift is an influencer-first marketing agency focused on performance, brand lift,
              and long-term creator partnerships. We sit at the intersection of data, storytelling,
              and culture.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Creator-first thinking</p>
                  <p className="text-xs text-gray-500">Respecting audience trust</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gray-900/5 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-gray-800" />
                </div>
                <div>
                  <p className="text-sm font-medium">Measurable impact</p>
                  <p className="text-xs text-gray-500">Not vanity metrics</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`relative rounded-3xl border border-gray-100 bg-gray-50/70 p-8 lg:p-10 overflow-hidden transition-all duration-800 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-black/5" />
            <div className="absolute -left-16 bottom-0 w-36 h-36 rounded-full bg-black/5" />
            <div className="relative space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Creator Network</p>
                  <p className="text-xs text-gray-500">Fashion • Beauty • Tech • Lifestyle</p>
                </div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2" />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Campaigns run with:</span>
                <span className="font-semibold text-gray-900">Micro & Macro Creators</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs mt-4">
                <div className="rounded-2xl bg-white/80 border border-gray-100 p-4">
                  <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-[0.18em]">
                    BRANDS
                  </p>
                  <p className="font-semibold text-sm mb-1">Premium & high-intent</p>
                  <p className="text-gray-500">
                    We work with brands that care about story, not just impressions.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/80 border border-gray-100 p-4">
                  <p className="text-[11px] text-gray-500 mb-1 uppercase tracking-[0.18em]">
                    CREATORS
                  </p>
                  <p className="font-semibold text-sm mb-1">Authentic voices</p>
                  <p className="text-gray-500">
                    Curated creators with strong audience trust and clear niches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24 lg:mb-28">
          <div className="mb-10 flex items-center justify-between gap-4">
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight">
              What we believe in
            </h2>
            <p className="hidden md:block text-sm text-gray-500 max-w-md text-right">
              Our philosophy is simple: if a campaign wouldn’t impress the creator’s own audience,
              it doesn’t go live.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-gray-100 rounded-3xl p-7 bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-4">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-semibold mb-2">Clarity of Objective</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We start with the business metric that matters—awareness, sign-ups, or sales—and
                design backwards.
              </p>
            </div>
            <div className="border border-gray-100 rounded-3xl p-7 bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-gray-900/5 flex items-center justify-center mb-4">
                <Sparkles className="w-4 h-4 text-gray-800" />
              </div>
              <h3 className="font-semibold mb-2">Respect for Audience</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Every integration should feel like a natural extension of the creator’s content,
                not an interruption.
              </p>
            </div>
            <div className="border border-gray-100 rounded-3xl p-7 bg-white hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-gray-900/5 flex items-center justify-center mb-4">
                <TrendingUp className="w-4 h-4 text-gray-800" />
              </div>
              <h3 className="font-semibold mb-2">Performance with Taste</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Data guides our decisions, but we never sacrifice brand or creator integrity for a
                short-term spike.
              </p>
            </div>
          </div>
        </section>

        {/* Journey Roadmap */}
        <section className="mb-24 lg:mb-28">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-[0.25em] text-gray-500 mb-3 uppercase">
              JOURNEY
            </p>
            <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3">
              How MountLift is growing up
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              A quick snapshot of where we started and how we’re shaping the next phase of
              influencer marketing.
            </p>
          </div>

          <div className="relative pl-5 md:pl-8">
            <div className="absolute left-1 md:left-2 top-3 bottom-3 w-px bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />

            <div className="space-y-10">
              {roadmapSteps.map((step, index) => {
                const isVisible = visibleSteps.has(index)
                return (
                  <div
                    key={step.year}
                    data-step={index}
                    className={`relative flex flex-col md:flex-row md:items-start gap-4 md:gap-8 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    }`}
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="absolute -left-0.5 md:-left-[7px] top-2 flex items-center justify-center">
                      <div
                        className={`w-3 h-3 rounded-full border-2 ${
                          isVisible ? 'bg-black border-black' : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>

                    <div className="min-w-[72px] pt-1">
                      <p className="text-xs font-medium tracking-[0.22em] text-gray-500 uppercase">
                        {step.year}
                      </p>
                    </div>

                    <div className="flex-1">
                      <div className="rounded-2xl border border-gray-100 bg-white/90 p-5 md:p-6 shadow-sm shadow-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-sm md:text-base">{step.title}</h3>
                          {index === roadmapSteps.length - 1 && (
                            <span className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-black text-white">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Now
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border border-gray-100 rounded-3xl bg-gray-50/70 p-8 lg:p-10 mb-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between">
            <div>
              <h3 className="text-xl lg:text-2xl font-semibold tracking-tight mb-2">
                Want to build your next influencer campaign with us?
              </h3>
              <p className="text-sm text-gray-600 max-w-xl">
                Whether you&apos;re a brand or a creator, we keep things straightforward. Clear
                briefs, transparent payouts, and campaigns that make sense for your audience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 transition-all duration-300"
              >
                Talk to the team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/#our-work"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-gray-300 text-sm hover:bg-black hover:text-white transition-all duration-300"
              >
                View our work
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}