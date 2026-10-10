'use client'
import Container from './Container'
import { useTheme } from '@/lib/theme'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import type { Lang, Dict } from '@/lib/i18n'

export default function Header({ lang, setLang, labels }: { lang: Lang, setLang: (l: Lang)=>void, labels: Dict }) {
  const { dark, setDark } = useTheme()
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [lang])
  const links = [
    { href: '#programs', label: labels.nav.programs },
    { href: '#results', label: labels.nav.results },
    { href: '#pricing', label: labels.nav.pricing },
    { href: '#contact', label: labels.nav.contact },
  ]
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
          {links.map(l => <a key={l.href} className="hover:text-brand-700 dark:hover:text-brand-300" href={l.href}>{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'en' ? 'uz' : 'en')} className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            {lang === 'en' ? 'UZ' : 'EN'}
          </button>
          <button onClick={() => setDark(!dark)} aria-label="Theme" className="rounded-full border border-slate-300 dark:border-slate-700 px-3 py-1 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
            {dark ? '🌙' : '☀️'}
          </button>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-white text-sm shadow-soft hover:bg-brand-700">
            {labels.hero.cta2}
          </a>
          <button onClick={() => setOpen(!open)} aria-label={labels.menu} aria-expanded={open} className="md:hidden rounded-full border border-slate-300 dark:border-slate-700 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <nav className="md:hidden border-t border-slate-200 dark:border-slate-800">
          <Container className="flex flex-col py-2">
            {links.map(l => <a key={l.href} onClick={() => setOpen(false)} className="py-3 font-medium hover:text-brand-700 dark:hover:text-brand-300" href={l.href}>{l.label}</a>)}
            <a href="#contact" onClick={() => setOpen(false)} className="my-2 inline-flex justify-center rounded-xl bg-brand-600 px-4 py-3 text-white font-semibold hover:bg-brand-700">{labels.hero.cta2}</a>
          </Container>
        </nav>
      )}
    </header>
  )
}
