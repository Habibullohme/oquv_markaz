'use client'
import { useState } from 'react'
import type { Dict } from '@/lib/i18n'

const EMPTY = { name: '', phone: '', email: '', message: '', website: '' }
const inputCls = 'mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-600'

export default function ContactForm({ labels }: { labels: Dict['contact'] }) {
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean, text: string } | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (!form.name.trim() || phoneDigits.length < 9 || (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) || !form.message.trim()) {
      setStatus({ ok: false, text: labels.invalid }); return
    }
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setStatus({ ok: true, text: labels.success })
      const r = (e.target as HTMLFormElement).querySelector('button')?.getBoundingClientRect()
      ;(window as unknown as { __confetti?: (x?: number, y?: number) => void }).__confetti?.(r ? r.left + r.width / 2 : undefined, r ? r.top : undefined)
      setForm(EMPTY)
      setTimeout(() => setStatus(null), 5000)
    } catch {
      setStatus({ ok: false, text: labels.error })
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={submit} noValidate>
      {/* Botlar uchun tuzoq — odamlarga ko'rinmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={e=>setForm({...form, website: e.target.value})} />
      <div>
        <label htmlFor="cf-name" className="text-sm font-medium">{labels.name}</label>
        <input id="cf-name" required maxLength={100} autoComplete="name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className={inputCls} placeholder={labels.namePh} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-phone" className="text-sm font-medium">{labels.phone}</label>
          <input id="cf-phone" type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className={inputCls} placeholder="+998 90 123 45 67" />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium">{labels.email}</label>
          <input id="cf-email" type="email" maxLength={120} autoComplete="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className={inputCls} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="text-sm font-medium">{labels.message}</label>
        <textarea id="cf-message" required maxLength={2000} value={form.message} onChange={e=>setForm({...form, message: e.target.value})} rows={4} className={inputCls} placeholder={labels.messagePh}></textarea>
      </div>
      <button disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
        {sending ? labels.sending : labels.submit}
      </button>
      {status && (
        <div role="status" className={`mt-3 rounded-xl px-4 py-3 ${status.ok ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'}`}>
          {status.text}
        </div>
      )}
    </form>
  )
}
