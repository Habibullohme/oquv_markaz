'use client'
import { useEffect, useRef, useState } from 'react'
import { Phone, Send, X } from 'lucide-react'
import ContactForm from './ContactForm'
import { SITE } from '@/lib/site'
import { ENROLL_EVENT, fill, prefillContact } from '@/lib/prefill'
import type { Dict } from '@/lib/i18n'

type LenisLike = { stop: () => void, start: () => void }

// Ariza oynasi: telefonda pastdan ko'tariladigan panel, kompyuterda markazda ochiladigan oyna.
// Saytdagi barcha href="#contact" tugmalari sahifani pastga sakratish o'rniga shu oynani ochadi.
export default function EnrollSheet({ T }: { T: Dict }) {
  const [open, setOpen] = useState(false)
  const [item, setItem] = useState<string | null>(null)
  const [drag, setDrag] = useState(0)
  const sheet = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)

  useEffect(() => {
    const show = (name?: string | null) => {
      setItem(name || null)
      if (name) setTimeout(() => prefillContact(fill(T.enroll.prefill, { name })), 0)
      setOpen(true)
    }
    // href="#contact" havolalarini ushlab olamiz (aloqa bo'limining o'zidagilaridan tashqari)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href="#contact"]') as HTMLAnchorElement | null
      if (!a || a.closest('#contact') || a.closest('[data-sheet]') || e.metaKey || e.ctrlKey) return
      e.preventDefault()
      show(a.dataset.enroll)
    }
    const onOpen = (e: Event) => show((e as CustomEvent<string | undefined>).detail)
    document.addEventListener('click', onClick, true)
    window.addEventListener(ENROLL_EVENT, onOpen)
    return () => { document.removeEventListener('click', onClick, true); window.removeEventListener(ENROLL_EVENT, onOpen) }
  }, [T.enroll.prefill])

  // Scroll bloklash animatsiyadan keyin (sahifani qayta hisoblash animatsiyani qotirmasligi uchun)
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis
    let t: ReturnType<typeof setTimeout> | undefined
    if (open) t = setTimeout(() => { lenis?.stop(); document.documentElement.style.overflow = 'hidden' }, 520)
    else { document.documentElement.style.overflow = ''; lenis?.start() }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); if (t) clearTimeout(t) }
  }, [open])

  // Telefonda panelni pastga tortib yopish
  const onTouchStart = (e: React.TouchEvent) => { if ((sheet.current?.scrollTop ?? 0) <= 0) startY.current = e.touches[0].clientY }
  const onTouchMove = (e: React.TouchEvent) => { if (startY.current !== null) setDrag(Math.max(0, e.touches[0].clientY - startY.current)) }
  const onTouchEnd = () => { if (drag > 110) setOpen(false); setDrag(0); startY.current = null }

  return (
    <div data-sheet className={`fixed inset-0 z-[70] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open} {...({ inert: open ? undefined : '' } as object)}>
      {/* Orqa fon */}
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink-950/60 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`} />
      {/* Panel */}
      <div role="dialog" aria-modal="true" aria-label={T.enroll.title}
        className={`sheet absolute inset-x-0 bottom-0 mx-auto max-h-[92dvh] w-full md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:max-w-xl ${open ? 'is-open' : ''}`}
        style={drag ? { transform: `translate3d(0, ${drag}px, 0)`, transition: 'none' } : undefined}>
        <div ref={sheet} data-lenis-prevent onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
          className="max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-[32px] bg-white text-ink-900 shadow-lift dark:bg-ink-900 dark:text-slate-100 md:rounded-[32px]">
          {/* Sarlavha qismi */}
          <div className="relative overflow-hidden bg-brand-700 px-6 pb-8 pt-4 text-white md:px-8 md:pt-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,rgba(255,212,59,.55),transparent)]" aria-hidden="true" />
            <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
            <div className="relative mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/30 md:hidden" aria-hidden="true" />
            <button type="button" onClick={() => setOpen(false)} aria-label={T.enroll.close} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition hover:rotate-90 hover:bg-white/25 md:right-5 md:top-5">
              <X className="h-5 w-5" />
            </button>
            <div className="sheet-item relative pr-12" style={{ ['--i' as string]: 0 }}>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{T.enroll.title}</h2>
              <p className="mt-2 text-brand-100">{T.enroll.subtitle}</p>
            </div>
            {item && (
              <div className="sheet-item relative mt-4 inline-flex items-center gap-2 rounded-full bg-sun-400 px-3 py-1.5 text-sm font-bold text-ink-900" style={{ ['--i' as string]: 1 }}>
                <span className="opacity-60">{T.enroll.selected}:</span>{item}
              </div>
            )}
          </div>
          <div className="sheet-item px-6 py-6 md:px-8" style={{ ['--i' as string]: 2 }}>
            <ContactForm labels={T.contact} idPrefix="sheet" />
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />{T.enroll.or}<span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 pb-[env(safe-area-inset-bottom,0px)]">
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3.5 font-bold dark:border-white/15"><Phone className="h-4 w-4" />{T.call}</a>
              <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-2xl bg-[#229ED9] py-3.5 font-bold text-white"><Send className="h-4 w-4" />Telegram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
