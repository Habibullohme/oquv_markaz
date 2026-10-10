import { NextResponse } from 'next/server'

// Example secure server-side handler.
// In production, connect to SMTP, Telegram bot, or database using secrets from process.env
export async function POST(req: Request) {
  const data = await req.json()
  // Basic validation
  if (!data?.name || !data?.phone || !data?.email || !data?.message) {
    return NextResponse.json({ ok: false, error: 'Invalid' }, { status: 400 })
  }
  // TODO: send email/SMS/telegram here using env secrets
  console.log('New contact submission:', data)
  return NextResponse.json({ ok: true })
}
