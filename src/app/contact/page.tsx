'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TerminalSquare, Send, CheckCircle2, AlertOctagon } from 'lucide-react'
import Link from 'next/link'

export default function ContactTerminal() {
  const [status, setStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS' | 'ERROR'>('IDLE')
  const [errorMessage, setErrorMessage] = useState('')

  const handleBriefingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('PROCESSING')
    
    const formData = new FormData(e.currentTarget)
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")
    formData.append("subject", "MT/LFT Network Alert: New Brand Briefing Initialized")
    formData.append("from_name", "MountLift System Architecture")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('SUCCESS')
      } else {
        setStatus('ERROR')
        setErrorMessage(data.message || "Data transmission routing failure.")
      }
    } catch (error) {
      setStatus('ERROR')
      setErrorMessage("Critical pipeline network failure disconnect.")
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-32 px-6 font-mono noise grid-overlay flex items-center justify-center relative overflow-hidden">
      
      {/* ── DRASTIC BACKGROUND GRAPHIC ANIMATION ── */}
      {/* Moving background light matrix following an infinite orbital path */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{
            x: [-400, 400, -400],
            y: [-200, 300, -200],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#00ffcc]/10 to-[#9900ff]/10 blur-[130px] rounded-full"
        />
      </div>

      <div className="max-w-3xl w-full relative z-10">
        
        {/* Terminal Housing Container */}
        <div className="card-glass rounded-3xl border border-white/10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative">
          
          {/* ── INTERNAL BACKGROUND DIGITAL RAIN ANIMATION ── */}
          {/* Digital stream overlays running softly behind the input fields */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-25 flex justify-around overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: 6 + (i * 2),
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.7
                }}
                className="w-[1px] h-32 bg-gradient-to-b from-transparent via-[#00ffcc]/40 to-transparent"
              />
            ))}
          </div>
          
          {/* Window Chrome Header Bar */}
          <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex justify-between items-center relative z-10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff0055]" />
              <div className="w-3 h-3 rounded-full bg-[#ffcc00]" />
              <div className="w-3 h-3 rounded-full bg-[#00ffcc]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
              MTLFT_SECURE_BRIEF_v1.02.sh
            </span>
          </div>

          <div className="p-8 md:p-12 relative z-10">
            {status !== 'SUCCESS' ? (
              <>
                <div className="mb-10">
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight flex items-center gap-3 text-white">
                    <TerminalSquare className="w-6 h-6 text-[#00ffcc]" />
                    Initialize Campaign Matrix
                  </h1>
                  <p className="text-xs text-gray-500 mt-2 tracking-wide uppercase">
                    // Enter parameters to route deployment directives directly to MountLift leadership.
                  </p>
                </div>

                <form onSubmit={handleBriefingSubmit} className="space-y-6">
                  {/* Row 1: Identity & Gateway */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        [01] BRAND_IDENTITY_NAME
                      </label>
                      <input 
                        type="text" 
                        name="brand_name" 
                        required 
                        disabled={status === 'PROCESSING'}
                        placeholder="e.g., GYMSHARK" 
                        className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#00ffcc] font-sans transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                        [02] SECURE_COMMS_GATEWAY
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        disabled={status === 'PROCESSING'}
                        placeholder="comms@yourbrand.com" 
                        className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#9900ff] font-sans transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Row 2: Strategic Directives */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                      [03] CAMPAIGN_MISSION_DIRECTIVES
                    </label>
                    <textarea 
                      name="mission_directives" 
                      rows={5} 
                      required
                      disabled={status === 'PROCESSING'}
                      placeholder="Outline target demographic psychographics, campaign scaling expectations, or core conversion objectives..." 
                      className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-[#ff0055] font-sans transition-colors disabled:opacity-50 resize-none"
                    />
                  </div>

                  {/* Dynamic Console Status Messages */}
                  {status === 'ERROR' && (
                    <div className="p-4 bg-[#ff0055]/10 border border-[#ff0055]/40 text-[#ff0055] rounded-xl flex items-center gap-3 text-xs uppercase font-bold tracking-wide">
                      <AlertOctagon className="w-5 h-5 shrink-0" />
                      <span>[CRITICAL_ERROR] {errorMessage}</span>
                    </div>
                  )}

                  {/* Execution Button */}
                  <button 
                    type="submit" 
                    disabled={status === 'PROCESSING'}
                    className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 hover:bg-[#00ffcc] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {status === 'PROCESSING' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ROUTING PACKET VECTORS...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Execute Data Injection
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success State Display screen */
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-[#00ffcc]/10 border border-[#00ffcc]/40 rounded-full flex items-center justify-center text-[#00ffcc] mb-8 shadow-[0_0_40px_rgba(0,255,204,0.2)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">
                  Transmission Secure.
                </h2>
                <p className="text-gray-400 max-w-md mx-auto text-sm leading-relaxed font-sans mb-8">
                  Your parameter blocks have been compiled and transmitted across the secure array. MountLift neural operatives have intercepted the log. Stand by for contact routing.
                </p>
                <Link 
                  href="/" 
                  className="px-6 py-2 border border-white/10 hover:border-[#00ffcc] text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-[#00ffcc] transition-colors rounded-lg bg-black/40"
                >
                  Return to Matrix Index
                </Link>
              </motion.div>
            )}
          </div>
        </div>
        
      </div>
    </main>
  )
}