'use client'
import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

// Kompyuterda: sahifa qancha o'qilganini ko'rsatuvchi doira va "yuqoriga" tugmasi
export default function ToTop({ label }: { label: string }) {
  const [p, setP] = useState(0)
  useEffect(() => {
    let queued = false
    const calc = () => { queued = false; const h = document.documentElement.scrollHeight - innerHeight; setP(h > 0 ? scrollY / h : 0) }
    const on = () => { if (!queued) { queued = true; requestAnimationFrame(calc) } }
    calc(); addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  const C = 2 * Math.PI * 22
  const go = () => {
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis
    if (l) l.scrollTo(0); else scrollTo({ top: 0, behavior: 'smooth' })
  }
  return (
    <button type="button" onClick={go} aria-label={label} title={label}
      className={`fixed bottom-24 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-white text-ink-900 shadow-lift transition duration-500 hover:-translate-y-1 dark:bg-ink-900 dark:text-white lg:flex ${p > 0.08 ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}>
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" strokeWidth="3" className="stroke-slate-200 dark:stroke-white/10" />
        <circle cx="24" cy="24" r="22" fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - p)} className="stroke-brand-600 dark:stroke-sun-400" />
      </svg>
      <ArrowUp className="relative h-5 w-5" />
    </button>
  )
}
