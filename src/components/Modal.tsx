'use client'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  wide?: boolean
}

export function Modal({ open, onClose, children, wide = false }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/88"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className={`relative bg-[#111] border border-teal/20 w-full ${wide ? 'max-w-2xl' : 'max-w-lg'} max-h-[90vh] overflow-y-auto`}
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#00E2E2 #111' }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-muted hover:text-white text-xl leading-none transition-colors z-10"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

// Reusable form input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
export function FormInput({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-mono text-[0.6rem] tracking-widest uppercase text-muted">{label}</label>}
      <input
        className={`bg-[#0a0a0a] border border-[#222] text-white font-sans text-sm px-4 py-3 outline-none transition-colors focus:border-teal placeholder:text-muted/50 ${className}`}
        {...props}
      />
    </div>
  )
}

// Reusable select
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  children: React.ReactNode
}
export function FormSelect({ label, className = '', children, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-mono text-[0.6rem] tracking-widest uppercase text-muted">{label}</label>}
      <select
        className={`bg-[#0a0a0a] border border-[#222] text-white font-sans text-sm px-4 py-3 outline-none transition-colors focus:border-teal appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

// Primary button
interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
}
export function PrimaryBtn({ children, loading, className = '', ...props }: BtnProps) {
  return (
    <button
      className={`bg-teal text-black font-sans font-extrabold text-sm tracking-widest uppercase py-4 px-8 transition-all hover:bg-teal-light disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? 'Please wait...' : children}
    </button>
  )
}

// Error message
export function FormError({ message }: { message: string }) {
  if (!message) return null
  return (
    <p className="font-mono text-[0.7rem] text-red-400 tracking-wide">{message}</p>
  )
}
