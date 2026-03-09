import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import { sendDeckConfirmation, notifyDeckRequest } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const { name, email, fund, cheque } = await req.json()

    if (!name || !email || !fund || !cheque) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    // Save to Supabase
    const db = createServiceClient()
    await db.from('deck_requests').insert({ name, email, fund, cheque_size: cheque })

    // Send emails (non-blocking — don't fail the request if email fails)
    await Promise.allSettled([
      sendDeckConfirmation(email, name),
      notifyDeckRequest({ name, email, fund, cheque }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('deck-request error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
