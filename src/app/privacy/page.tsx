'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Shield, Lock, Eye, FileText } from 'lucide-react'

export default function PrivacyPolicy() {
  const lastUpdated = "December , 2025" // Update this date as needed

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* --- Background Textures (Same as Home) --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight hover:text-gray-600 transition-colors">
            MOUNTLIFT
          </Link>
          <Link 
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="relative z-10 pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-3 mb-6 bg-gray-100 rounded-2xl">
              <Shield className="w-8 h-8 text-gray-900" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          {/* Policy Text Content */}
          <div className="prose prose-lg prose-gray max-w-none">
            
            {/* Introduction */}
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 mb-12">
              <p className="text-gray-700 leading-relaxed m-0">
                At <strong>MountLift</strong>, we value your privacy and are committed to protecting your personal data. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our influencer marketing services. By accessing or using our services, you signify that you have read, 
                understood, and agree to our collection, storage, use, and disclosure of your personal information as described 
                in this Privacy Policy.
              </p>
            </div>

            <div className="space-y-12">
              
              {/* Section 1 */}
              <section>
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm">1</span>
                  Information We Collect
                </h2>
                <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                  <p>We collect information that you provide directly to us, such as when you fill out a contact form, apply as a creator, or request a campaign audit.</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Personal Identification Data:</strong> Name, email address, phone number, and social media handles.</li>
                    <li><strong>Business Data:</strong> Company name, job title, and brand details (for clients).</li>
                    <li><strong>Content Data:</strong> Links to your social media profiles, portfolio, and audience demographics (for creators).</li>
                  </ul>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm">2</span>
                  How We Use Your Information
                </h2>
                <div className="pl-11 space-y-4 text-gray-600 leading-relaxed">
                  <p>We use the information we collect to provide, maintain, and improve our services, including:</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">Service Delivery</h3>
                      <p className="text-sm">To facilitate brand-creator partnerships and manage campaigns.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                      <p className="text-sm">To send you updates, newsletters, and respond to your inquiries.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
                      <p className="text-sm">To monitor and analyze trends, usage, and activities in connection with our services.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 mb-2">Security</h3>
                      <p className="text-sm">To detect, investigate, and prevent fraudulent transactions and other illegal activities.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm">3</span>
                  Sharing of Information
                </h2>
                <div className="pl-11 text-gray-600 leading-relaxed">
                  <p className="mb-4">
                    We do not sell your personal data. We may share your information in the following situations:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>With <strong>vendors and service providers</strong> who need access to such information to carry out work on our behalf (e.g., analytics, hosting).</li>
                    <li>With <strong>brands or creators</strong> specifically for the purpose of facilitating a collaboration you have agreed to.</li>
                    <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process.</li>
                  </ul>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="flex items-center gap-3 text-2xl font-bold mb-6 text-gray-900">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-black text-white text-sm">4</span>
                  Your Data Rights
                </h2>
                <div className="pl-11 text-gray-600 leading-relaxed">
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <ul className="grid sm:grid-cols-2 gap-4 mt-4">
                    <li className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gray-400" />
                      The right to access your data.
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      The right to correct inaccurate data.
                    </li>
                    <li className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-gray-400" />
                      The right to request deletion.
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      The right to withdraw consent.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Contact Section */}
              <section className="mt-16 pt-12 border-t border-gray-100">
                <div className="bg-black text-white rounded-3xl p-10 text-center">
                  <h2 className="text-2xl font-bold mb-4">Questions about our privacy practices?</h2>
                  <p className="text-gray-400 mb-8">We are here to help and answer any questions you might have.</p>
                  <a 
                    href="mailto:mountliftagency@gmail.com"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </a>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer (Simplified) */}
      <footer className="bg-gray-50 py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MountLift Agency. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <Link href="/privacy" className="text-black font-medium">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}