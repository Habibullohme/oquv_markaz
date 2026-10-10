'use client'
import { useEffect, useRef, useState } from 'react'
import { PREFILL_EVENT } from '@/lib/prefill'
import { ArrowRight, Check } from 'lucide-react'
import Roll from './Roll'
import type { Dict } from '@/lib/i18n'

const EMPTY = { name: '', phone: '', email: '', message: '', website: '' }

// Suzuvchi yozuvli maydon: bo'sh bo'lsa yozuv ichida, bosilganda yoki to'ldirilganda tepaga ko'tariladi
function Field({ id, label, textarea, ...rest }: { id: string, label: string, textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const cls = 'peer block w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-4 pb-2.5 pt-6 outline-none transition focus:border-brand-500 focus:bg-white dark:focus:border-sun-400 dark:focus:bg-transparent'
  return (
    <div className="relative">
      {textarea
        ? <textarea id={id} placeholder=" " rows={4} className={`${cls} resize-none`} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        : <input id={id} placeholder=" " className={cls} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-4 origin-left text-slate-500 dark:text-slate-400 transition-all duration-300 peer-focus:top-2 peer-focus:scale-[.78] peer-focus:text-brand-600 dark:peer-focus:text-sun-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[.78]">{label}</label>
    </div>
  )
}

export default function ContactForm({ labels }: { labels: Dict['contact'] }) {
  const [form, setForm] = useState(EMPTY)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean, text: string } | null>(null)
  const [flash, setFlash] = useState(false)
  const nameRef = useRef<HTMLDivElement>(null)

  // Kalkulyator yoki daraja testidan kelgan matn "Xabar" maydoniga yoziladi
  useEffect(() => {
    const on = (e: Event) => {
      const msg = (e as CustomEvent<string>).detail
      setForm(f => ({ ...f, message: msg }))
      setFlash(true)
      setTimeout(() => setFlash(false), 1600)
      setTimeout(() => nameRef.current?.querySelector('input')?.focus({ preventScroll: true }), 900)
    }
    window.addEventListener(PREFILL_EVENT, on)
    return () => window.removeEventListener(PREFILL_EVENT, on)
  }, [])

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
      setTimeout(() => setStatus(null), 6000)
    } catch {
      setStatus({ ok: false, text: labels.error })
    } finally {
      setSending(false)
    }
  }

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value })

  return (
    <form className="relative space-y-4" onSubmit={submit} noValidate>
      {/* Botlar uchun tuzoq — odamlarga ko'rinmaydi */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={form.website} onChange={set('website')} />
      <div ref={nameRef}><Field id="cf-name" label={labels.name} required maxLength={100} autoComplete="name" value={form.name} onChange={set('name')} /></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field id="cf-phone" label={labels.phone} type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} />
        <Field id="cf-email" label={labels.email} type="email" maxLength={120} autoComplete="email" value={form.email} onChange={set('email')} />
      </div>
      <div className={`rounded-2xl transition-shadow duration-500 ${flash ? 'ring-4 ring-sun-400/70' : ''}`}><Field id="cf-message" label={labels.message} textarea required maxLength={2000} value={form.message} onChange={set('message')} /></div>
      <button disabled={sending} data-magnetic className="group flex w-full items-center justify-between gap-3 rounded-2xl bg-brand-600 py-2 pl-6 pr-2 font-bold text-white transition hover:bg-brand-700 disabled:opacity-60 dark:bg-sun-400 dark:text-ink-900 dark:hover:bg-sun-300">
        <Roll text={sending ? labels.sending : labels.submit} />
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 dark:bg-ink-900/10 transition duration-500 group-hover:rotate-[-45deg]"><ArrowRight className="h-5 w-5" /></span>
      </button>
      {status && !status.ok && (
        <div role="status" className="rounded-xl bg-red-50 dark:bg-red-900/30 px-4 py-3 text-red-700 dark:text-red-300">{status.text}</div>
      )}
      {status?.ok && (
        <div role="status" className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/95 dark:bg-ink-900/95 text-center animate-fade-up">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white"><Check className="h-10 w-10 check-draw" strokeWidth={3} /></span>
          <div className="font-display text-xl font-bold">{status.text}</div>
        </div>
      )}
    </form>
  )
}
