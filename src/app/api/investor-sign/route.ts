import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendDDAccessEmail, notifyInvestorSigned } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, fund, amount, signature } = await req.json()

    if (!name || !email || !fund || !amount || !signature) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    if (amount < 500000) {
      return NextResponse.json({ error: 'Minimum investment is $500,000' }, { status: 400 })
    }

    const signedAt = new Date()
    const expiresAt = new Date(signedAt.getTime() + 14 * 24 * 60 * 60 * 1000)

    const db = createServiceClient()

    // Save investor submission
    await db.from('investor_submissions').insert({
      name, email, fund,
      amount: Number(amount),
      signature,
      signed_at: signedAt.toISOString(),
    })

    // Save DD access record
    await db.from('dd_access').insert({
      identifier: email.toLowerCase(),
      granted_at: signedAt.toISOString(),
      expires_at: expiresAt.toISOString(),
    })

    // Send emails
    await Promise.allSettled([
      sendDDAccessEmail(email, name, expiresAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })),
      notifyInvestorSigned({ name, email, fund, amount: Number(amount), signature }),
    ])

    return NextResponse.json({
      success: true,
      expiresAt: expiresAt.toISOString(),
    })
  } catch (err) {
    console.error('investor-sign error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
