'use client'
import { useState } from 'react'
import { Modal, FormInput, PrimaryBtn, FormError } from './Modal'

interface Props {
  open: boolean
  onClose: () => void
  onAccessGranted: (identifier: string, expiresAt: string | null) => void
  onApplyInstead: () => void
}

export function AccessModal({ open, onClose, onAccessGranted, onApplyInstead }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async () => {
    if (!value.trim()) { setError('Enter an access code or email address.'); return }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/dd-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: value.trim() }),
      })
      const data = await res.json()
      if (!data.valid) { setError(data.error || 'Invalid. Please try again.'); return }
      setDone(true)
      setTimeout(() => {
        onClose()
        onAccessGranted(value.trim(), data.expiresAt)
        setValue(''); setDone(false)
      }, 1200)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => { setValue(''); setError(''); setDone(false); onClose() }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="p-10">
        <p className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-teal mb-3">Due Diligence Suite</p>
        <h2 className="font-display text-4xl text-white leading-none mb-2">Access Materials</h2>
        <p className="font-mono text-xs text-muted tracking-wider mb-8">Enter your access code or the email address you signed up with.</p>

        {done ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✓</div>
            <h3 className="font-display text-3xl text-teal mb-3">Access Granted.</h3>
            <p className="font-mono text-xs text-muted tracking-wider">Loading your DD suite...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <FormInput
              placeholder="Access Code or Email Address"
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') submit() }}
            />
            <FormError message={error} />
            <PrimaryBtn onClick={submit} loading={loading} className="w-full">Access DD Suite →</PrimaryBtn>
            <p className="font-mono text-[0.65rem] text-center text-[#333] tracking-wider">
              No access yet?{' '}
              <button
                onClick={() => { handleClose(); onApplyInstead() }}
                className="text-teal underline cursor-pointer hover:text-teal-light transition-colors"
              >
                Apply to invest →
              </button>
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
