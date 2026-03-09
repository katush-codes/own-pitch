import type { Metadata } from 'next'
import { Bebas_Neue, Syne, DM_Mono } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Own. — The Intelligence Economy',
  description: 'Pre-Series A Round · NEMO Enterprises Inc. · The intelligence economy\'s first platform.',
  openGraph: {
    title: 'Own. — The Intelligence Economy',
    description: 'Raising our Pre-Series A. Creators own. Audiences earn. Truth has a price.',
    url: 'https://pitch.ownapp.co',
    siteName: 'Own.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${syne.variable} ${dmMono.variable} bg-[#080808] text-[#f5f2ec] antialiased`}>
        {/* Noise overlay */}
        <div className="fixed inset-0 pointer-events-none z-[999] opacity-40"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")" }} />
        {children}
      </body>
    </html>
  )
}
