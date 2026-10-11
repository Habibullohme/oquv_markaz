'use client'
import Container from './Container'
import Logo from './Logo'
import Roll from './Roll'
import { useTheme } from '@/lib/theme'
import { SITE } from '@/lib/site'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, Moon, Phone, Send, Sun, X } from 'lucide-react'
import type { Lang, Dict } from '@/lib/i18n'

const KEYS = ['why', 'courses', 'test', 'teachers', 'results', 'pricing', 'faq'] as const

type LenisLike = { stop: () => void, start: () => void }

export default function Header({ lang, labels }: { lang: Lang, labels: Pick<Dict, 'nav' | 'menu' | 'call'> & { hero: { cta1: string } } }) {
  const otherHref = lang === 'en' ? '/' : '/en'
  const { dark, setDark } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  // Menyu ochiq bo'lsa sahifa scroll bo'lmaydi; Esc bilan yopiladi
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    // Scroll'ni bloklash (va Lenis.stop) butun sahifani qayta hisoblatadi — shuning uchun menyu animatsiyasi tugagach qilamiz
    let t: ReturnType<typeof setTimeout> | undefined
    if (open) t = setTimeout(() => { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }, 550)
    else { document.documentElement.style.overflow = ''; lenis?.start() }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); if (t) clearTimeout(t) }
  }, [open])

  const btn = 'flex h-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 transition'
  return (
    <>
      <header className={`sticky top-0 z-50 transition ${scrolled ? 'border-b border-slate-200/80 dark:border-white/10 bg-paper/80 dark:bg-ink-950/80 glass' : 'border-b border-transparent'}`}>
        <Container className="flex items-center justify-between gap-4 py-3">
          <Logo />
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold">
            {KEYS.map(k => <a key={k} className="rounded-lg px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-brand-700 dark:hover:text-white hover:bg-white dark:hover:bg-white/5" href={`#${k}`}>{labels.nav[k]}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={otherHref} hrefLang={lang === 'en' ? 'uz' : 'en'} className={`${btn} hidden px-3 text-sm font-bold sm:flex`}>{lang === 'en' ? 'UZ' : 'EN'}</Link>
            <button onClick={() => setDark(!dark)} aria-label="Theme" className={`${btn} hidden w-10 sm:flex`}>{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</button>
            <a href="#contact" className="hidden sm:inline-flex h-10 items-center rounded-xl bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700 transition"><Roll text={labels.nav.contact} /></a>
            <button onClick={() => setOpen(true)} aria-label={labels.menu} aria-expanded={open} aria-controls="mnav" className="flex h-11 items-center gap-2 rounded-full bg-ink-900 pl-4 pr-3 text-sm font-bold text-white dark:bg-white dark:text-ink-900 xl:hidden">
              {labels.menu}<Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      {/* To'liq ekranli telefon menyusi (header'dan tashqarida: header'ning blur effekti fixed elementni buzmasligi uchun) */}
      <div id="mnav" className="mnav fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink-950 text-white xl:hidden" data-open={open ? '' : undefined} aria-hidden={!open} {...({ inert: open ? undefined : '' } as object)}>
        {/* Yengil fon: blur va to'r yo'q (telefonda menyu tez ochilishi uchun) */}
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_100%_30%,rgba(50,56,230,.35),transparent)]" aria-hidden="true" />
        <Container className="relative flex w-full items-center justify-between py-3">
          <span className="font-display text-sm font-bold text-slate-500">{labels.menu}</span>
          <button onClick={() => setOpen(false)} aria-label="Close" className="flex h-11 items-center gap-2 rounded-full bg-sun-400 pl-4 pr-3 text-sm font-bold text-ink-900">
            <X className="h-5 w-5" />
          </button>
        </Container>
        <Container className="relative flex w-full flex-1 flex-col justify-center py-6">
          <nav className="flex flex-col">
            {KEYS.map((k, i) => (
              <a key={k} href={`#${k}`} onClick={() => setOpen(false)} style={{ ['--i' as string]: i }}
                className="mnav-item group flex items-center justify-between border-b border-white/10 py-3.5 font-display text-[1.8rem] sm:text-5xl font-bold leading-none active:text-sun-400 [@media(max-height:700px)]:py-2.5 [@media(max-height:700px)]:text-2xl">
                {labels.nav[k]}
                <ArrowUpRight className="h-7 w-7 text-white/30 transition group-active:rotate-45 group-active:text-sun-400" />
              </a>
            ))}
          </nav>
          <div className="mnav-item mt-8 grid grid-cols-2 gap-3" style={{ ['--i' as string]: KEYS.length }}>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 py-4 font-bold"><Phone className="h-4 w-4" />{labels.call}</a>
            <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-[#229ED9] py-4 font-bold"><Send className="h-4 w-4" />Telegram</a>
            <a href="#contact" onClick={() => setOpen(false)} className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-sun-400 py-4 font-bold text-ink-900">{labels.hero.cta1} →</a>
          </div>
          <div className="mnav-item mt-6 flex gap-2" style={{ ['--i' as string]: KEYS.length + 1 }}>
            <Link href={otherHref} hrefLang={lang === 'en' ? 'uz' : 'en'} onClick={() => setOpen(false)} className="flex h-11 flex-1 items-center justify-center rounded-xl border border-white/15 text-sm font-bold">{lang === 'en' ? "O'zbekcha" : 'English'}</Link>
            <button onClick={() => setDark(!dark)} aria-label="Theme" className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 text-sm font-bold">{dark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}{dark ? 'Dark' : 'Light'}</button>
          </div>
        </Container>
      </div>
    </>
  )
}
