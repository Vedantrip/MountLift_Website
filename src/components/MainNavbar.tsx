'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Phone, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Influencer Marketing', href: '/#hero' },
  { label: 'Tools for Creators', href: '/#benefits' },
  { label: 'Exclusive Representation', href: '/#benefits' },
  { label: 'Our Work', href: '/#our-work' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact', href: '/#contact' },
]

export default function MainNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          // Made ~10% more transparent than before: 85 -> 75
          ? 'bg-white/75 backdrop-blur-md shadow-xl'
          // Made ~10% more transparent than before: 70 -> 60
          : 'bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">

          {/* LOGO WITH MOUNTAIN RIDGE ARROW */}
          <Link
            href="/"
            className="relative inline-flex items-center text-2xl font-bold tracking-tight transition-all duration-300 group"
            aria-label="MountLift home"
          >
            <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.22em] group-hover:text-gray-800">
              MOUNTLIFT
            </span>

            {/* Mountain Ridge + Arrow Behind Logo */}
            <span
              className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 transform transition-transform duration-400 will-change-transform group-hover:-translate-y-2"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 100 30"
                className="w-full h-full text-gray-900/25 transition-colors duration-400 group-hover:text-gray-900/70"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                {/* Mountain Ridges */}
                <polyline
                  points="0,22 18,10 34,16 52,8 70,18 88,6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.95"
                />
                {/* Arrow Head (keeps it subtle) */}
                <polyline
                  points="80,10 92,4 88,12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity="0.95"
                />
              </svg>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm font-light tracking-wide transition-all duration-300 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent transition-all duration-500 group-hover:w-full transform -translate-x-1/2"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE CTA */}
          <div className="flex items-center space-x-4">

            {/* Call Button */}
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
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/75 backdrop-blur-sm border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
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
  )
}