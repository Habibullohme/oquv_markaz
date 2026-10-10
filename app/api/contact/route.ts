import { NextResponse } from 'next/server'

const LIMITS = { name: 100, phone: 30, email: 120, message: 2000 }
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(req: Request) {
  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid' }, { status: 400 })
  }

  // Botlar uchun yashirin maydon: to'ldirilgan bo'lsa, jim qabul qilamiz
  if (data?.website) return NextResponse.json({ ok: true })

  const f = {
    name: String(data?.name ?? '').trim(),
    phone: String(data?.phone ?? '').trim(),
    email: String(data?.email ?? '').trim(),
    message: String(data?.message ?? '').trim(),
  }
  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some(k => f[k].length > LIMITS[k])
  if (!f.name || !f.phone || !f.message || (f.email && !EMAIL_RE.test(f.email)) || tooLong) {
    return NextResponse.json({ ok: false, error: 'Invalid' }, { status: 400 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID sozlanmagan')
    return NextResponse.json({ ok: false, error: 'Not configured' }, { status: 500 })
  }

  const lines = [
    '<b>🆕 Yangi ariza</b>',
    '',
    `<b>Ism:</b> ${escapeHtml(f.name)}`,
    `<b>Telefon:</b> ${escapeHtml(f.phone)}`,
  ]
  if (f.email) lines.push(`<b>Email:</b> ${escapeHtml(f.email)}`)
  lines.push('', `<b>Xabar:</b>\n${escapeHtml(f.message)}`)
  const text = lines.join('\n')

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    if (!res.ok) {
      console.error('Telegram xatosi:', res.status, await res.text())
      return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
    }
  } catch (e) {
    console.error('Telegram bilan aloqa yo\'q:', e)
    return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
