'use client'
import { useState } from 'react'
import { Modal, FormInput, FormSelect, PrimaryBtn, FormError } from './Modal'

interface Props { open: boolean; onClose: () => void }

export function DeckModal({ open, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', fund: '', cheque: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.name || !form.email || !form.fund || !form.cheque) {
      setError('All fields are required.'); return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/deck-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, fund: form.fund, cheque: form.cheque }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const reset = () => { setForm({ name: '', email: '', fund: '', cheque: '' }); setDone(false); setError('') }
  const handleClose = () => { reset(); onClose() }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-10">
        <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-teal mb-3">Pre-Series A Round — 2026</p>
        <h2 className="font-display text-4xl text-white leading-none mb-8">Get the Full Deck</h2>

        {done ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display text-3xl text-teal mb-3">You're in.</h3>
            <p className="font-mono text-xs text-muted tracking-wider">Check your inbox — the deck is on its way.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <FormInput placeholder="Full Name *" value={form.name} onChange={e => set('name', e.target.value)} />
            <FormInput type="email" placeholder="Email Address *" value={form.email} onChange={e => set('email', e.target.value)} />
            <FormInput placeholder="Fund / Organisation *" value={form.fund} onChange={e => set('fund', e.target.value)} />
            <FormSelect value={form.cheque} onChange={e => set('cheque', e.target.value)}>
              <option value="" disabled>Cheque Size *</option>
              <option>Under $500K</option>
              <option>$500K – $1M</option>
              <option>$1M – $2.5M</option>
              <option>$2.5M – $5M</option>
              <option>$5M+</option>
            </FormSelect>
            <FormError message={error} />
            <PrimaryBtn onClick={submit} loading={loading} className="mt-2 w-full">
              Send Me the Deck →
            </PrimaryBtn>
          </div>
        )}
      </div>
    </Modal>
  )
}
