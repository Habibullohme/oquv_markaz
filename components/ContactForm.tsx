'use client'
import { useState } from 'react'

export default function ContactForm({ labels }: { labels: any }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<string>('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.phone || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.message) {
      alert(labels.invalid); return;
    }
    setSending(true)
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setDone(labels.success)
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch (e) {
      setDone('Error. Try again later.')
    } finally {
      setSending(false)
      setTimeout(()=>setDone(''), 4000)
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={submit}>
      <div>
        <label className="text-sm font-medium">{labels.name}</label>
        <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-600" placeholder="e.g., Shavkat Malikov" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">{labels.phone}</label>
          <input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-600" placeholder="+998 XX XXX XX XX" />
        </div>
        <div>
          <label className="text-sm font-medium">{labels.email}</label>
          <input value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-600" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">{labels.message}</label>
        <textarea value={form.message} onChange={e=>setForm({...form, message: e.target.value})} rows={4} className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-600" placeholder="Tell us your goals…"></textarea>
      </div>
      <button disabled={sending} className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800 disabled:opacity-60">
        {sending ? labels.sending : labels.submit}
      </button>
      {done && <div className="mt-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 px-4 py-3 text-emerald-700 dark:text-emerald-300">{done}</div>}
    </form>
  )
}
