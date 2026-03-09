'use client'
import { useState } from 'react'
import { Modal, FormInput, PrimaryBtn, FormError } from './Modal'

interface Props { open: boolean; onClose: () => void; onAccessGranted: (name: string, email: string, expiresAt: string | null) => void }

type Step = 'form' | 'termsheet' | 'done'

const QUICK_AMOUNTS = [500000, 1000000, 2500000, 5000000, 10000000]
const fmt = (n: number) => '$' + n.toLocaleString()

export function InvestModal({ open, onClose, onAccessGranted }: Props) {
  const [step, setStep] = useState<Step>('form')
  const [form, setForm] = useState({ name: '', email: '', fund: '', amount: '' })
  const [checks, setChecks] = useState({ fund: false, identity: false, terms: false, mnda: false })
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const setCheck = (k: string, v: boolean) => setChecks(c => ({ ...c, [k]: v }))

  const gotoTermSheet = () => {
    const amt = parseFloat(form.amount)
    if (!form.name || !form.email || !form.fund) { setError('All fields are required.'); return }
    if (!amt || amt < 500000) { setError('Minimum investment amount is $500,000.'); return }
    setError('')
    setSignature(form.name)
    setStep('termsheet')
  }

  const sign = async () => {
    if (!signature.trim()) { setError('Please type your full legal name to sign.'); return }
    if (!checks.fund || !checks.identity || !checks.terms || !checks.mnda) {
      setError('Please confirm all statements above before signing.'); return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/investor-sign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, email: form.email, fund: form.fund,
          amount: parseFloat(form.amount), signature,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setStep('done')
      setTimeout(() => {
        onClose()
        onAccessGranted(form.name, form.email, data.expiresAt)
        reset()
      }, 1500)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setStep('form'); setForm({ name: '', email: '', fund: '', amount: '' })
    setChecks({ fund: false, identity: false, terms: false, mnda: false })
    setSignature(''); setError('')
  }
  const handleClose = () => { reset(); onClose() }

  return (
    <Modal open={open} onClose={handleClose} wide={step === 'termsheet'}>
      <div className="p-10">
        {/* STEP 1: FORM */}
        {step === 'form' && (
          <>
            <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-teal mb-3">I Want to Invest</p>
            <h2 className="font-display text-4xl text-white leading-none mb-2">Let's Talk.</h2>
            <p className="font-mono text-xs text-muted tracking-wider mb-8">Complete your details, sign the term sheet, and get 2-week DD access.</p>
            <div className="flex flex-col gap-4">
              <FormInput placeholder="Full Name *" value={form.name} onChange={e => set('name', e.target.value)} />
              <FormInput type="email" placeholder="Email Address *" value={form.email} onChange={e => set('email', e.target.value)} />
              <FormInput placeholder="Fund / Organisation *" value={form.fund} onChange={e => set('fund', e.target.value)} />
              {/* Amount field */}
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-mono text-sm pointer-events-none">$</span>
                  <input
                    type="number" min={500000} step={50000}
                    placeholder="Investment Amount (min. $500,000) *"
                    value={form.amount}
                    onChange={e => set('amount', e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-[#222] text-white font-sans text-sm pl-7 pr-4 py-3 outline-none transition-colors focus:border-teal placeholder:text-muted/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {QUICK_AMOUNTS.map(a => (
                    <button
                      key={a} type="button"
                      onClick={() => set('amount', String(a))}
                      className="border border-[#222] text-muted font-mono text-[0.62rem] tracking-wider px-3 py-1.5 transition-all hover:border-teal hover:text-teal"
                    >
                      {fmt(a)}
                    </button>
                  ))}
                </div>
              </div>
              <FormError message={error} />
              <PrimaryBtn onClick={gotoTermSheet} className="mt-2 w-full">Continue to Term Sheet →</PrimaryBtn>
            </div>
          </>
        )}

        {/* STEP 2: TERM SHEET */}
        {step === 'termsheet' && (
          <>
            <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-teal mb-3">Term Sheet</p>
            <h2 className="font-display text-4xl text-white leading-none mb-8">Pre-Series A Round — 2026</h2>

            {/* Terms table */}
            <div className="border border-[#1a1a1a] p-6 mb-6 font-mono text-xs leading-loose text-white/70">
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                {[
                  ['Company', 'NEMO Enterprises Inc.'],
                  ['Round', 'Pre-Series A'],
                  ['Round Size', '$10,000,000'],
                  ['Instrument', 'SAFE (Pre-Money)'],
                  ['Valuation Cap', '$190,000,000'],
                  ['Discount', '30%'],
                  ['Pro-Rata Rights', 'Yes (investors $500K+)'],
                  ['Min. Ticket', '$500,000'],
                  ['Use of Funds', 'Product, TAM, GTM, Launch, Prediction Market Launch'],
                  ['Your Commitment', form.amount ? fmt(parseFloat(form.amount)) : '—'],
                  ['Closing Date', 'April 30, 2026'],
                ].map(([k, v]) => (
                  <>
                    <span key={`k-${k}`} className="text-muted">{k}</span>
                    <span key={`v-${k}`} className={k === 'Your Commitment' ? 'text-teal font-bold' : 'text-white'}>{v}</span>
                  </>
                ))}
              </div>
            </div>

            {/* MNDA */}
            <div className="border-l-2 border-teal pl-5 py-4 bg-[#0a0a0a] mb-4">
              <p className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-teal mb-2">Mutual Non-Disclosure Agreement (MNDA)</p>
              <p className="font-mono text-xs text-white/50 leading-relaxed">
                By proceeding, both parties agree to keep all information exchanged in connection with this investment opportunity strictly confidential.
                This includes all financial data, product details, strategic information, and the contents of the DD suite.
                This MNDA is mutual — NEMO Enterprises Inc. equally agrees to keep investor information confidential.
                This agreement remains in effect for 24 months from the date of signing.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-4 mb-6 font-mono text-[0.72rem] text-white/40 leading-relaxed">
              This term sheet is non-binding and for discussion purposes only. It does not constitute a legal commitment to invest.
              Final terms are subject to legal documentation and completion of due diligence. By signing below you confirm you
              have read and understood this summary and consent to being contacted by NEMO Enterprises Inc.
              Access to the DD suite is granted for 14 days from the date of signing and is subject to the MNDA above.
            </div>

            {/* Confirmation checkboxes */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { key: 'fund', text: 'I confirm that I am investing on behalf of the fund / organisation I have named above, and I am authorised to do so.' },
                { key: 'identity', text: 'I confirm that the name I am providing is my legal full name and I am the individual entering this agreement.' },
                { key: 'terms', text: 'I confirm I have read the term sheet and MNDA above and I am sure I want to proceed to due diligence.' },
                { key: 'mnda', text: 'I agree to the Mutual Non-Disclosure Agreement outlined above.' },
              ].map(({ key, text }) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checks[key as keyof typeof checks]}
                    onChange={e => setCheck(key, e.target.checked)}
                    className="mt-0.5 w-4 h-4 flex-shrink-0 accent-teal"
                  />
                  <span className="font-mono text-[0.72rem] text-white/60 leading-relaxed">{text}</span>
                </label>
              ))}
            </div>

            {/* Signature */}
            <p className="font-mono text-xs text-muted tracking-wider mb-2">Type your full legal name to sign:</p>
            <FormInput
              placeholder="Full Legal Name"
              value={signature}
              onChange={e => setSignature(e.target.value)}
              className="mb-3"
            />
            <FormError message={error} />
            <PrimaryBtn onClick={sign} loading={loading} className="mt-3 w-full">
              Sign &amp; Access DD Suite →
            </PrimaryBtn>
          </>
        )}

        {/* STEP 3: DONE */}
        {step === 'done' && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display text-3xl text-teal mb-3">Signed. Access Granted.</h3>
            <p className="font-mono text-xs text-muted tracking-wider">Loading your DD suite...</p>
          </div>
        )}
      </div>
    </Modal>
  )
}
