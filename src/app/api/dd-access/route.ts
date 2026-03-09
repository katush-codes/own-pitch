import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json()

    if (!identifier) {
      return NextResponse.json({ valid: false, error: 'Enter an access code or email' }, { status: 400 })
    }

    const val = identifier.trim()
    const db = createServiceClient()

    // 1. Check hardcoded access codes from env
    const codes = (process.env.DD_ACCESS_CODES || '').split(',').map((c: string) => c.trim().toUpperCase())
    if (codes.includes(val.toUpperCase())) {
      return NextResponse.json({ valid: true, type: 'code', expiresAt: null })
    }

    // 2. Check email in dd_access table (set by investor-sign route)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
    if (isEmail) {
      const { data } = await db
        .from('dd_access')
        .select('*')
        .eq('identifier', val.toLowerCase())
        .order('granted_at', { ascending: false })
        .limit(1)
        .single()

      if (data) {
        const now = new Date()
        const expires = new Date(data.expires_at)
        if (now < expires) {
          return NextResponse.json({ valid: true, type: 'email', expiresAt: data.expires_at })
        } else {
          return NextResponse.json({ valid: false, error: 'Your access has expired. Contact investments@iown.app' })
        }
      }
    }

    return NextResponse.json({ valid: false, error: 'Invalid code or email. Contact investments@iown.app' })
  } catch (err) {
    console.error('dd-access error:', err)
    return NextResponse.json({ valid: false, error: 'Server error' }, { status: 500 })
  }
}
