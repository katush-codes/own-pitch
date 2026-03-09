'use client'

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
    <path d="M3.18 23.76c.3.17.64.22.99.14l.1-.06 11.04-6.37-2.39-2.39-9.74 8.68zm-1.1-20.1a1.99 1.99 0 0 0-.08.62v19.44c0 .23.04.44.08.63l.06.08 10.9-10.9v-.25L2.14 3.58l-.06.08zm20.24 8.85-2.96-1.71-2.64 2.64 2.64 2.64 2.98-1.72c.85-.49.85-1.28-.02-1.85zm-17.3 9.36 12.14-13.98-2.38-2.38L3.02 3.6c-.02-.01-.04-.01-.06-.02-.84.49-.86 1.34-.03 1.84l11.04 6.38-8.95 8.95-.04.07c-.01.04-.02.07-.02.1z"/>
  </svg>
)

interface AppBadgesProps {
  className?: string
  dark?: boolean
}

export function AppBadges({ className = '', dark = false }: AppBadgesProps) {
  const borderColor = dark ? 'border-black/20 hover:border-black/50' : 'border-teal/25 hover:border-teal'
  const textColor = dark ? 'text-black/70' : 'text-white'
  const subColor = dark ? 'text-black/40' : 'text-muted'

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      <a
        href="https://www.ownapp.co"
        target="_blank"
        rel="noopener noreferrer"
        className={`font-mono text-xs tracking-widest uppercase border-b pb-px transition-colors ${
          dark ? 'text-black/60 border-black/30 hover:border-black' : 'text-teal border-teal/30 hover:border-teal'
        }`}
      >
        www.ownapp.co
      </a>

      <a
        href="https://apps.apple.com/us/app/own-post-go-viral-repeat/id6470322906"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 border px-3 py-2 transition-all ${borderColor} ${textColor}`}
      >
        <AppleIcon />
        <div className="flex flex-col">
          <span className={`font-mono text-[0.52rem] tracking-widest uppercase leading-none ${subColor}`}>Download on the</span>
          <span className="font-sans text-[0.82rem] font-bold leading-snug">App Store</span>
        </div>
      </a>

      <a
        href="https://play.google.com/store/apps/details?id=com.nemo.nemoapp&pcampaignid=web_share"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 border px-3 py-2 transition-all ${borderColor} ${textColor}`}
      >
        <GoogleIcon />
        <div className="flex flex-col">
          <span className={`font-mono text-[0.52rem] tracking-widest uppercase leading-none ${subColor}`}>Get it on</span>
          <span className="font-sans text-[0.82rem] font-bold leading-snug">Google Play</span>
        </div>
      </a>
    </div>
  )
}
