'use client'
import { useEffect, useState } from 'react'

interface Props {
  open: boolean
  name: string
  email: string
  expiresAt: string | null
  onBack: () => void
}

const SECTIONS = [
  { icon: '📊', num: '01', title: 'Financials', desc: 'P&L projections, unit economics, revenue model, 3-year forecast.' },
  { icon: '🏗️', num: '02', title: 'Product & Tech', desc: 'Architecture overview, IP documentation, product roadmap, tech stack.' },
  { icon: '👥', num: '03', title: 'Team', desc: 'Founder bios, advisory board, org structure, hiring plan.' },
  { icon: '⚖️', num: '04', title: 'Legal', desc: 'Cap table, incorporation docs, IP assignments, SAFE templates.' },
  { icon: '📈', num: '05', title: 'Market Research', desc: 'TAM/SAM/SOM analysis, competitive landscape, user research data.' },
  { icon: '🚀', num: '06', title: 'Go-to-Market', desc: 'Launch strategy, growth channels, partnership pipeline, traction data.' },
]

export function DDSuite({ open, name, email, expiresAt, onBack }: Props) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    if (!open) return
    const expiry = expiresAt ? new Date(expiresAt) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    const update = () => {
      const diff = expiry.getTime() - Date.now()
      if (diff <= 0) { setTimeLeft('EXPIRED'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      setTimeLeft(`${d}d ${h}h`)
    }
    update()
    const t = setInterval(update, 60000)
    return () => clearInterval(t)
  }, [open, expiresAt])

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-[#080808] z-[8000] overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-teal/15 pb-8 mb-12 flex-wrap gap-4">
          <div>
            <p className="font-mono text-[0.6rem] tracking-[0.3em] uppercase text-teal mb-2">Confidential — Authorised Access Only</p>
            <h1 className="font-display text-5xl text-white leading-none">Due Diligence Suite</h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-muted mb-1">{name} · {email}</p>
            <p className="font-display text-3xl text-teal">{timeLeft}</p>
            <p className="font-mono text-[0.6rem] tracking-widest uppercase text-muted">Access Expires</p>
          </div>
        </div>

        {/* Sections grid */}
        <div className="grid grid-cols-3 gap-px bg-teal/8 border border-teal/8 mb-12">
          {SECTIONS.map(s => (
            <div
              key={s.num}
              className="bg-[#0a0a0a] p-8 cursor-pointer transition-colors hover:bg-[#111] group"
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div className="font-mono text-[0.58rem] tracking-[0.25em] uppercase text-muted mb-2">Section {s.num}</div>
              <div className="font-display text-xl text-white mb-2">{s.title}</div>
              <div className="font-sans text-sm text-white/40 leading-relaxed">{s.desc}</div>
              <div className="mt-4 font-mono text-[0.62rem] text-teal tracking-wider group-hover:tracking-[0.15em] transition-all">
                VIEW DOCUMENTS →
              </div>
            </div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="border border-teal/15 p-6 flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="font-display text-xl text-white">Questions? We're here.</div>
            <div className="font-mono text-xs text-muted mt-1">investments@iown.app · www.ownapp.co</div>
          </div>
          <button
            onClick={onBack}
            className="border border-white/15 text-muted font-mono text-xs tracking-widest uppercase px-5 py-3 transition-all hover:border-teal hover:text-teal"
          >
            ← Back to Pitch
          </button>
        </div>

      </div>
    </div>
  )
}
