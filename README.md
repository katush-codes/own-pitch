# own-pitch — Next.js Website

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS** — styling
- **Resend** — transactional emails
- **Supabase** — database (Postgres)
- **Vercel** — deployment (recommended)

---

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in your keys (see below)
npm run dev
```

Open http://localhost:3000

---

## Setup Guide

### 1. Resend (Email)
1. Go to https://resend.com → create free account
2. Add your domain or use `onboarding@resend.dev` for testing
3. Copy your API key → `RESEND_API_KEY` in `.env.local`

### 2. Supabase (Database)
1. Go to https://supabase.com → new project
2. Go to SQL Editor and run this schema:

```sql
-- Deck requests
create table deck_requests (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  fund text not null,
  cheque_size text not null,
  created_at timestamptz default now()
);

-- Investor submissions (signed term sheet)
create table investor_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  fund text not null,
  amount bigint not null,
  signature text not null,
  signed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- DD access records
create table dd_access (
  id uuid default gen_random_uuid() primary key,
  identifier text not null,   -- email or code
  granted_at timestamptz default now(),
  expires_at timestamptz not null
);

-- Enable RLS (Row Level Security)
alter table deck_requests enable row level security;
alter table investor_submissions enable row level security;
alter table dd_access enable row level security;

-- Service role can do everything (used in API routes)
create policy "service_all" on deck_requests for all using (true);
create policy "service_all" on investor_submissions for all using (true);
create policy "service_all" on dd_access for all using (true);
```

3. Copy your Project URL and keys → `.env.local`

### 3. Environment Variables
Fill in `.env.local` (copy from `.env.local.example`):

```
RESEND_API_KEY=re_...
EMAIL_FROM=Own. <investments@iown.app>
EMAIL_NOTIFY=investments@iown.app

NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

DD_ACCESS_CODES=OWN-DD-2026,NEMO-ACCESS,PRESERIESA

NEXT_PUBLIC_APP_URL=https://pitch.ownapp.co
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub → import at https://vercel.com/new → add env vars in project settings.

---

## Project Structure

```
src/
  app/
    page.tsx              ← Main pitch landing page
    layout.tsx            ← Root layout (fonts, metadata)
    globals.css           ← Global styles + Tailwind
    api/
      deck-request/       ← POST: save + email deck request
      investor-sign/      ← POST: save + email signed investor
      dd-access/          ← POST: verify access code/email
  components/
    DeckModal.tsx         ← Request deck form
    InvestModal.tsx       ← Invest form + term sheet + signing
    AccessModal.tsx       ← DD access code/email entry
    DDSuite.tsx           ← Full-screen DD materials view
    AppBadges.tsx         ← App Store / Google Play badges
    Modal.tsx             ← Shared modal + form primitives
  lib/
    supabase.ts           ← DB client + types
    email.ts              ← All email templates (Resend)
```

---

## Adding Real DD Documents

In `DDSuite.tsx`, each section card has `VIEW DOCUMENTS →`.
Link each to your actual files — Google Drive, Notion, Dropbox, or a protected `/dd/[section]` route.

## Customising Access Codes

In `.env.local`:
```
DD_ACCESS_CODES=CODE1,CODE2,CODE3
```

Codes are case-insensitive. Add/remove without redeploying by updating the env var in Vercel dashboard.
