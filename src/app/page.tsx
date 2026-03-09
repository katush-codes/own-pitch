'use client'
import { useState } from 'react'
import { DeckModal } from '@/components/DeckModal'
import { InvestModal } from '@/components/InvestModal'
import { AccessModal } from '@/components/AccessModal'
import { DDSuite } from '@/components/DDSuite'
import { AppBadges } from '@/components/AppBadges'

type ModalType = 'deck' | 'invest' | 'access' | null

export default function Home() {
  const [modal, setModal] = useState<ModalType>(null)
  const [dd, setDD] = useState({ open: false, name: '', email: '', expiresAt: null as string | null })

  const openDD = (name: string, email: string, expiresAt: string | null) => {
    setDD({ open: true, name, email, expiresAt })
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="min-h-screen grid grid-rows-[1fr_auto] px-12 py-12 relative overflow-hidden border-b border-[#1f1f1f]">
        {/* BG radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,226,226,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(216,232,0,0.04) 0%, transparent 50%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(0,226,226,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,226,226,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        {/* Nav */}
        <nav className="flex justify-between items-center relative z-10">
          <div className="font-display text-4xl text-teal tracking-widest">own.</div>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted">Pre-Series A Round — 2026</div>
        </nav>

        {/* Content */}
        <div className="flex flex-col justify-center relative z-10 py-24">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-teal mb-8 animate-fade-up">The Intelligence Economy</p>
          <h1 className="font-display leading-[0.88] tracking-tight text-white animate-fade-up-2"
            style={{ fontSize: 'clamp(5rem,14vw,13rem)' }}>
            Attention<br />
            <span className="text-teal">Becomes</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(245,242,236,0.25)', color: 'transparent' }}>Equity.</span>
          </h1>
          <p className="max-w-lg mt-10 text-lg leading-relaxed text-white/65 animate-fade-up-3">
            A social media and prediction market platform where creators compete, audiences bet on outcomes, and{' '}
            <strong className="text-white font-bold">everyone owns what they build</strong> — IP included. The multi-trillion-dollar market for truth and real-time intelligence, unlocked.
          </p>
          <div className="flex gap-4 mt-12 flex-wrap animate-fade-up-4">
            <button onClick={() => setModal('deck')} className="bg-teal text-black font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all hover:bg-teal-light hover:-translate-y-0.5">
              Request Deck
            </button>
            <button className="bg-transparent text-white font-mono text-xs tracking-[0.15em] uppercase border border-white/20 px-8 py-4 transition-all hover:border-teal hover:text-teal">
              Learn More ↓
            </button>
          </div>
        </div>

        {/* Stats + badges */}
        <div className="relative z-10 border-t border-white/[0.06] pt-10 flex flex-col gap-6 animate-fade-up-5">
          <div className="flex gap-10 flex-wrap">
            {[['$4T+','Addressable Market'],['3-in-1','Social + AI + Markets'],['100%','Creator IP Ownership'],['0','Platforms Like This']].map(([n,l]) => (
              <div key={l} className="flex flex-col gap-1">
                <span className="font-display text-4xl text-teal leading-none">{n}</span>
                <span className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-muted">{l}</span>
              </div>
            ))}
          </div>
          <AppBadges />
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] border-y border-[#1f1f1f] py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-ticker">
          {['Creator Economy','→','Prediction Markets','→','AI Rankings','→','IP Ownership','→','Real-Time Intelligence','→','Attention as Asset','→',
            'Creator Economy','→','Prediction Markets','→','AI Rankings','→','IP Ownership','→','Real-Time Intelligence','→','Attention as Asset','→',
          ].map((item, i) => (
            <span key={i} className={`font-mono text-xs tracking-[0.15em] uppercase px-10 ${item !== '→' && i % 4 === 0 ? 'text-teal' : 'text-muted'}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHAT IS IT ───────────────────────────────────── */}
      <section className="px-12 py-28 border-b border-[#1a1a1a]">
        <p className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-teal mb-14 flex items-center gap-4 after:content-[''] after:w-14 after:h-px after:bg-teal after:opacity-40">
          What is Own.
        </p>
        <div className="grid grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {[
            ['01','Social Media Reimagined','Social Media','Creators compete in AI-ranked arenas. Performance is transparent, meritocratic, and financially rewarded. No more black-box algorithms deciding your fate.'],
            ['02','Prediction Markets Built In','Built In','Audiences don\'t just watch — they bet. On creators, on outcomes, on ideas. Attention becomes a financial instrument for the first time.'],
            ['03','Own What You Create','Own','Every piece of content is IP. Creators hold the rights, license their work, and build compounding digital assets — not just follower counts.'],
            ['04','A Market for Truth','Truth','Real-time collective intelligence surfaces what\'s actually true and what matters. Own. is infrastructure for the information economy.'],
          ].map(([num, title, accent, body]) => (
            <div key={num} className="bg-[#080808] p-12 transition-colors hover:bg-[#0f0f0f]">
              <div className="font-display text-7xl text-teal/10 leading-none mb-6">{num}</div>
              <div className="font-sans text-xl font-extrabold text-white mb-4 leading-snug">{title}</div>
              <div className="font-sans text-sm leading-relaxed text-white/50">{body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE SHIFT ────────────────────────────────────── */}
      <section className="px-12 py-28 border-b border-[#1a1a1a]">
        <p className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-teal mb-14 flex items-center gap-4 after:content-[''] after:w-14 after:h-px after:bg-teal after:opacity-40">
          The Shift
        </p>
        <h2 className="font-display leading-[0.92] text-white mb-12" style={{ fontSize: 'clamp(3rem,6vw,6rem)' }}>
          The old model<br />is <span className="text-[#D8E800]">broken.</span>
        </h2>
        <div className="max-w-4xl">
          {[
            ['Platforms own your content','You own your IP'],
            ['Attention is harvested','Attention is monetized by you'],
            ['Opaque algorithmic ranking','AI-powered transparent competition'],
            ['Passive audience','Audiences with real skin in the game'],
            ['Information is free (and worthless)','Truth has a price'],
          ].map(([from, to], i) => (
            <div key={i} className="grid gap-8 py-6 border-t border-[#1a1a1a] items-center group" style={{ gridTemplateColumns: '80px 1fr 1fr' }}>
              <span className="font-mono text-sm text-[#2a2a2a] text-center group-hover:text-teal transition-colors">→</span>
              <span className="font-mono text-sm text-muted line-through decoration-[#333]">{from}</span>
              <span className="font-sans font-bold text-white">{to}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARKET ───────────────────────────────────────── */}
      <section className="px-12 py-28 bg-[#1a1a1a] relative border-b border-[#1a1a1a] overflow-hidden">
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-transparent pointer-events-none select-none"
          style={{ fontSize: 'clamp(7rem,18vw,18rem)', WebkitTextStroke: '1px rgba(0,226,226,0.15)' }}>$4T</div>
        <div className="max-w-xl relative z-10">
          <p className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-teal mb-14 flex items-center gap-4 after:content-[''] after:w-14 after:h-px after:bg-teal after:opacity-40">
            Market Opportunity
          </p>
          <h2 className="font-display leading-[0.95] text-white mb-8" style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)' }}>
            A <span className="text-teal">multi-trillion</span> dollar white space
          </h2>
          <p className="text-base leading-relaxed text-white/55 mb-10">
            Own. sits at the convergence of three massive, fast-growing markets: the $500B creator economy, the exploding prediction market sector, and the $2T+ intelligence and data industry. No single platform has combined them. Until now.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Creator Economy','Prediction Markets','AI & Intelligence','IP & Digital Assets','Social Media','Real-Time Data'].map(p => (
              <span key={p} className="font-mono text-[0.68rem] tracking-[0.15em] uppercase border border-teal/25 text-teal px-3 py-1.5">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="px-12 py-28 border-b border-[#1a1a1a]">
        <p className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-teal mb-14 flex items-center gap-4 after:content-[''] after:w-14 after:h-px after:bg-teal after:opacity-40">
          How It Works
        </p>
        <div className="grid grid-cols-4 border border-[#1a1a1a]">
          {[
            ['✦','01','Create & Compete','Creators publish content and enter AI-ranked competitive arenas. Performance is scored in real time.'],
            ['◈','02','Audiences Bet','Followers bet on creator outcomes, ideas, and predictions. Attention converts directly into financial stakes.'],
            ['◎','03','Win & Earn','Creators earn from their rankings, predictions, and IP licensing. Audiences earn from accurate bets.'],
            ['⬡','04','Own Forever','All content is protected IP. Creators build lasting digital assets with compounding value over time.'],
          ].map(([icon, num, title, desc], i) => (
            <div key={num} className={`p-10 relative transition-colors hover:bg-[#0d0d0d] ${i < 3 ? 'border-r border-[#1a1a1a]' : ''}`}>
              <span className="text-3xl text-teal block mb-5">{icon}</span>
              <div className="font-mono text-[0.6rem] tracking-[0.25em] text-muted uppercase mb-3">Step {num}</div>
              <div className="font-sans font-extrabold text-white text-lg mb-3 leading-snug">{title}</div>
              <div className="font-sans text-sm text-white/45 leading-relaxed">{desc}</div>
              {i < 3 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-[#080808] border border-teal rounded-full flex items-center justify-center z-10 text-[0.55rem] text-teal">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="px-12 py-28 bg-[#050505] relative overflow-hidden border-b border-[#1a1a1a]">
        <div className="absolute top-0 left-0 right-0 h-px opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #00E2E2, transparent)' }} />
        <div className="absolute font-display text-transparent pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ fontSize: 'clamp(8rem,22vw,22rem)', WebkitTextStroke: '1px rgba(0,226,226,0.04)', letterSpacing: '0.05em' }}>MISSION</div>

        <p className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-teal mb-14 relative z-10 flex items-center gap-4 after:content-[''] after:w-14 after:h-px after:bg-teal after:opacity-40">
          Our Mission
        </p>

        <div className="grid grid-cols-2 gap-24 items-center relative z-10">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-teal mb-6">The Untapped Asset</p>
            <h2 className="font-display leading-[0.92] text-white mb-10" style={{ fontSize: 'clamp(3rem,5.5vw,5.5rem)' }}>
              The creator economy is the most valuable asset on the planet.<br />
              <span className="text-teal">No one has figured it out.</span><br />
              <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(245,242,236,0.2)' }}>Until now.</span>
            </h2>
            <p className="text-base leading-relaxed text-white/55 max-w-md">
              Own. is building the infrastructure layer where identity, culture, and commerce converge. Where creators become media companies, communities drive distribution, and attention — for the first time — converts into real, ownable wealth.
            </p>
          </div>
          <div className="border border-[#1a1a1a]">
            {[
              ['01','Creators are the new media','Not just influencers. Full media companies with infrastructure, monetization, and IP ownership to match.'],
              ['02','Community powers distribution','Audiences with skin in the game don\'t scroll past — they evangelize. Prediction markets turn passive fans into active distributors.'],
              ['03','Attention economy, monetized globally','We convert the world\'s most abundant resource — human attention — into cash. For creators, for audiences, for everyone in the ecosystem.'],
            ].map(([num, title, body]) => (
              <div key={num} className="p-8 border-b border-[#1a1a1a] last:border-b-0 transition-colors hover:bg-[#0d0d0d]">
                <div className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-muted mb-2">Pillar {num}</div>
                <div className="font-sans font-extrabold text-white text-lg mb-2 leading-snug">
                  {title.split(' ').map((w, i) => ['new','distribution','globally'].includes(w.toLowerCase())
                    ? <span key={i} className="text-teal">{w} </span>
                    : w + ' '
                  )}
                </div>
                <div className="font-sans text-sm text-white/45 leading-relaxed">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission bar */}
        <div className="mt-20 p-10 bg-teal relative z-10">
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="font-display text-black leading-none" style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)' }}>
              Our mission: convert the attention and creator economies into cash.
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-mono text-xs tracking-[0.2em] uppercase text-black/50">Own. — 2026</div>
              <div className="flex gap-3 flex-wrap">
                <a href="https://www.ownapp.co" target="_blank" className="font-mono text-[0.62rem] tracking-wider uppercase text-black/60 border-b border-black/30 hover:border-black/60 transition-colors pb-px">www.ownapp.co</a>
                <a href="https://apps.apple.com" target="_blank" className="font-mono text-[0.62rem] tracking-wider uppercase text-black/60 hover:text-black/80 transition-colors">↓ App Store</a>
                <a href="https://play.google.com" target="_blank" className="font-mono text-[0.62rem] tracking-wider uppercase text-black/60 hover:text-black/80 transition-colors">↓ Google Play</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────── */}
      <section className="text-center px-12 py-36 bg-[#080808] relative overflow-hidden border-b border-[#1a1a1a]">
        <div className="absolute font-display text-transparent top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: '40vw', WebkitTextStroke: '1px rgba(0,226,226,0.04)' }}>OWN.</div>
        <h2 className="font-display leading-[0.9] text-white relative z-10 mb-6" style={{ fontSize: 'clamp(3.5rem,8vw,8rem)' }}>
          The future<br />of attention<br />is <span className="text-teal">owned.</span>
        </h2>
        <p className="font-sans text-base text-white/50 max-w-md mx-auto mb-12 leading-relaxed relative z-10">
          We're raising our Pre-Series A Round to build the intelligence economy's first platform. Join us at the ground floor.
        </p>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <button onClick={() => setModal('deck')} className="bg-teal text-black font-bold text-sm tracking-widest uppercase px-10 py-4 transition-all hover:bg-teal-light hover:-translate-y-0.5">
            Request Investment Deck
          </button>
          <button onClick={() => setModal('invest')} className="bg-transparent text-white font-mono text-xs tracking-[0.15em] uppercase border border-white/20 px-8 py-4 transition-all hover:border-teal hover:text-teal">
            I Want to Invest →
          </button>
          <button onClick={() => setModal('access')} className="bg-transparent font-mono text-xs tracking-[0.15em] uppercase border border-teal/40 text-teal px-8 py-4 transition-all hover:border-teal hover:bg-teal/5">
            Access DD Suite →
          </button>
          <div className="font-mono text-xs tracking-[0.2em] uppercase text-muted mt-2">investments@iown.app</div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#050505] border-t border-teal/10 px-12 pt-16 pb-10">
        <div className="grid grid-cols-3 gap-16 mb-12 items-start">
          <div>
            <div className="font-display text-3xl text-teal tracking-widest mb-4">own.</div>
            <p className="font-mono text-xs text-[#333] leading-relaxed tracking-wider mb-6">
              The intelligence economy's first platform. Creators own. Audiences earn. Truth has a price.
            </p>
            <AppBadges />
          </div>
          <div>
            <div className="font-mono text-[0.58rem] tracking-[0.3em] uppercase text-muted mb-5">Investors</div>
            <div className="flex flex-col gap-3">
              {[['Request Investment Deck', () => setModal('deck')],['I Want to Invest', () => setModal('invest')],['Access DD Suite', () => setModal('access')]].map(([label, fn]) => (
                <button key={label as string} onClick={fn as () => void} className="text-left font-sans text-sm text-white/50 transition-colors hover:text-teal">{label as string}</button>
              ))}
              <a href="mailto:investments@iown.app" className="font-sans text-sm text-white/50 transition-colors hover:text-teal">investments@iown.app</a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[0.58rem] tracking-[0.3em] uppercase text-muted mb-5">Product</div>
            <div className="flex flex-col gap-3">
              <a href="https://www.ownapp.co" target="_blank" className="font-sans text-sm text-white/50 hover:text-teal transition-colors">www.ownapp.co</a>
              <a href="https://apps.apple.com" target="_blank" className="font-sans text-sm text-white/50 hover:text-teal transition-colors">Download — App Store</a>
              <a href="https://play.google.com" target="_blank" className="font-sans text-sm text-white/50 hover:text-teal transition-colors">Download — Google Play</a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-6 flex justify-between items-center flex-wrap gap-4">
          <div className="font-mono text-[0.62rem] text-[#333] tracking-wider">© 2026 NEMO Enterprises Inc. All rights reserved. Confidential.</div>
          <div className="font-mono text-[0.62rem] text-[#333] tracking-wider">Pre-Series A Round · Closing April 30, 2026</div>
        </div>
      </footer>

      {/* ── MODALS ───────────────────────────────────────── */}
      <DeckModal open={modal === 'deck'} onClose={() => setModal(null)} />
      <InvestModal
        open={modal === 'invest'}
        onClose={() => setModal(null)}
        onAccessGranted={(name, email, expiresAt) => openDD(name, email, expiresAt)}
      />
      <AccessModal
        open={modal === 'access'}
        onClose={() => setModal(null)}
        onAccessGranted={(id, expiresAt) => openDD(id, id, expiresAt)}
        onApplyInstead={() => setModal('invest')}
      />

      {/* ── DD SUITE ─────────────────────────────────────── */}
      <DDSuite
        open={dd.open}
        name={dd.name}
        email={dd.email}
        expiresAt={dd.expiresAt}
        onBack={() => setDD(d => ({ ...d, open: false }))}
      />
    </>
  )
}
