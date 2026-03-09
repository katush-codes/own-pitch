import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM || 'Own. <investments@iown.app>'
const NOTIFY = process.env.EMAIL_NOTIFY || 'investments@iown.app'

// ── Send deck request confirmation ──────────────────────
export async function sendDeckConfirmation(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Own. — Your Investment Deck',
    html: `
      <div style="background:#080808;color:#f5f2ec;font-family:sans-serif;padding:40px;max-width:560px;margin:0 auto;">
        <div style="font-size:2rem;font-weight:900;letter-spacing:0.05em;color:#00E2E2;margin-bottom:24px;">own.</div>
        <h1 style="font-size:1.6rem;margin-bottom:16px;">Hi ${name},</h1>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:24px;">
          Thanks for your interest in Own.'s Pre-Series A Round. Your copy of the investment deck is attached below.
        </p>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:32px;">
          If you'd like to proceed to due diligence or have any questions, reply to this email or visit:
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background:#00E2E2;color:#080808;font-weight:800;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;padding:14px 28px;text-decoration:none;display:inline-block;">
          View Pitch Site →
        </a>
        <p style="color:#555;font-size:0.75rem;margin-top:40px;letter-spacing:0.1em;text-transform:uppercase;">
          investments@iown.app · www.ownapp.co
        </p>
      </div>
    `,
  })
}

// ── Notify team of deck request ──────────────────────────
export async function notifyDeckRequest(data: {
  name: string; email: string; fund: string; cheque: string
}) {
  return resend.emails.send({
    from: FROM,
    to: NOTIFY,
    subject: `New Deck Request — ${data.name} (${data.fund})`,
    html: `
      <div style="font-family:monospace;padding:24px;background:#f9f9f9;">
        <h2>New Deck Request</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fund</td><td style="padding:8px;border:1px solid #ddd;">${data.fund}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Cheque Size</td><td style="padding:8px;border:1px solid #ddd;">${data.cheque}</td></tr>
        </table>
      </div>
    `,
  })
}

// ── Send DD access confirmation after signing ─────────────
export async function sendDDAccessEmail(to: string, name: string, expiresAt: string) {
  const accessUrl = `${process.env.NEXT_PUBLIC_APP_URL}?access=true`
  return resend.emails.send({
    from: FROM,
    to,
    subject: 'Own. — DD Suite Access Granted',
    html: `
      <div style="background:#080808;color:#f5f2ec;font-family:sans-serif;padding:40px;max-width:560px;margin:0 auto;">
        <div style="font-size:2rem;font-weight:900;letter-spacing:0.05em;color:#00E2E2;margin-bottom:24px;">own.</div>
        <h1 style="font-size:1.6rem;margin-bottom:16px;">Access Granted, ${name}.</h1>
        <p style="color:rgba(245,242,236,0.7);line-height:1.7;margin-bottom:8px;">
          You've signed the term sheet and your DD suite access is now active.
        </p>
        <p style="color:#00E2E2;font-size:0.85rem;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:32px;">
          Access expires: ${expiresAt}
        </p>
        <a href="${accessUrl}" style="background:#00E2E2;color:#080808;font-weight:800;font-size:0.85rem;letter-spacing:0.12em;text-transform:uppercase;padding:14px 28px;text-decoration:none;display:inline-block;">
          Enter DD Suite →
        </a>
        <p style="color:rgba(245,242,236,0.5);font-size:0.8rem;margin-top:32px;line-height:1.6;">
          Use your email address (${to}) to re-enter the DD suite at any time before expiry.
          All information is subject to the MNDA you signed.
        </p>
        <p style="color:#555;font-size:0.75rem;margin-top:40px;letter-spacing:0.1em;text-transform:uppercase;">
          investments@iown.app · www.ownapp.co
        </p>
      </div>
    `,
  })
}

// ── Notify team of investor sign ─────────────────────────
export async function notifyInvestorSigned(data: {
  name: string; email: string; fund: string; amount: number; signature: string
}) {
  return resend.emails.send({
    from: FROM,
    to: NOTIFY,
    subject: `🔥 Investor Signed Term Sheet — ${data.name} ($${data.amount.toLocaleString()})`,
    html: `
      <div style="font-family:monospace;padding:24px;background:#f9f9f9;">
        <h2 style="color:green;">Term Sheet Signed</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Name</td><td style="padding:8px;border:1px solid #ddd;">${data.name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${data.email}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Fund</td><td style="padding:8px;border:1px solid #ddd;">${data.fund}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Amount</td><td style="padding:8px;border:1px solid #ddd;color:green;font-weight:bold;">$${data.amount.toLocaleString()}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Signature</td><td style="padding:8px;border:1px solid #ddd;">${data.signature}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Signed At</td><td style="padding:8px;border:1px solid #ddd;">${new Date().toISOString()}</td></tr>
        </table>
      </div>
    `,
  })
}
