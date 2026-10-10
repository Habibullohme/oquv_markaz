'use client'
import Container from './Container'
import { useTheme } from '@/lib/theme'
import { useState, useEffect } from 'react'
import type { Lang } from '@/lib/i18n'

export default function Header({ lang, setLang, labels }: { lang: Lang, setLang: (l: Lang)=>void, labels: any }) {
  const { dark, setDark } = useTheme()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [lang])
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 glass">
      <Container className="flex items-center justify-between py-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="text-2xl">🎓</span>
          <div>
            <div className="font-extrabold leading-5">IELTS Academy LC</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Band 7+ • CEFR B1–C1</div>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-brand-700 dark:hover:text-brand-300" href="#programs">{labels.nav.programs}</a>
          <a className="hover:text-brand-700 dark:hover:text-brand-300" href="#results">{labels.nav.results}</a>
          <a className="hover:text-brand-700 dark:hover:text-brand-300" href="#pricing">{labels.nav.pricing}</a>
          <a className="hover:text-brand-700 dark:hover:text-brand-300" href="#contact">{labels.nav.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'en' ? 'uz' : 'en')} className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            {lang === 'en' ? 'UZ' : 'EN'}
          </button>
          <button onClick={() => setDark(!dark)} className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            {dark ? '🌙' : '☀️'}
          </button>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-white text-sm shadow-soft hover:bg-brand-700">
            {labels.hero.cta2}
          </a>
        </div>
      </Container>
    </header>
  )
}
