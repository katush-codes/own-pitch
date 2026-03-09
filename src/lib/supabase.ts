import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with full permissions
export function createServiceClient() {
  return createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// ── Types ────────────────────────────────────────────────
export type DeckRequest = {
  id?: string
  name: string
  email: string
  fund: string
  cheque_size: string
  created_at?: string
}

export type InvestorSubmission = {
  id?: string
  name: string
  email: string
  fund: string
  amount: number
  signature: string
  signed_at?: string
  created_at?: string
}

export type DDAccess = {
  id?: string
  identifier: string   // email or code used
  granted_at?: string
  expires_at?: string
}
