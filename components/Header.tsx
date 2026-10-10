'use client'
import Container from './Container'
import Logo from './Logo'
import { useTheme } from '@/lib/theme'
import { useState, useEffect } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import type { Lang, Dict } from '@/lib/i18n'

const KEYS = ['courses', 'method', 'teachers', 'results', 'pricing', 'faq'] as const

export default function Header({ lang, setLang, labels }: { lang: Lang, setLang: (l: Lang)=>void, labels: Dict }) {
  const { dark, setDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { setOpen(false) }, [lang])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const btn = 'flex h-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition'
  return (
    <header className={`sticky top-0 z-50 transition ${scrolled || open ? 'border-b border-slate-200/80 dark:border-white/10 bg-paper/80 dark:bg-ink-950/80 glass' : 'border-b border-transparent'}`}>
      <Container className="flex items-center justify-between gap-4 py-3">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          {KEYS.map(k => <a key={k} className="rounded-lg px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-white dark:hover:bg-white/5" href={`#${k}`}>{labels.nav[k]}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'en' ? 'uz' : 'en')} className={`${btn} px-3 text-sm font-bold`}>{lang === 'en' ? 'UZ' : 'EN'}</button>
          <button onClick={() => setDark(!dark)} aria-label="Theme" className={`${btn} w-10`}>{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</button>
          <a href="#contact" className="hidden sm:inline-flex h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700 transition">{labels.nav.contact}</a>
          <button onClick={() => setOpen(!open)} aria-label={labels.menu} aria-expanded={open} className={`${btn} w-10 lg:hidden`}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <nav className="lg:hidden border-t border-slate-200 dark:border-white/10">
          <Container className="flex flex-col py-2">
            {KEYS.map(k => <a key={k} onClick={() => setOpen(false)} className="py-3 font-display font-bold hover:text-brand-600 dark:hover:text-sun-400" href={`#${k}`}>{labels.nav[k]}</a>)}
            <a href="#contact" onClick={() => setOpen(false)} className="my-2 inline-flex justify-center rounded-xl bg-brand-600 px-4 py-3 text-white font-bold hover:bg-brand-700">{labels.hero.cta1}</a>
          </Container>
        </nav>
      )}
    </header>
  )
}
