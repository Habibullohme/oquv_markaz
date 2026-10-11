'use client'
import { useEffect, useState } from 'react'
import { Phone, Send } from 'lucide-react'
import { SITE } from '@/lib/site'
import type { Dict } from '@/lib/i18n'

// Telefonda: bosh qismdan o'tgach pastda paydo bo'ladigan panel. Aloqa bo'limiga yetganda yashirinadi.
export default function MobileBar({ T }: { T: Pick<Dict, 'call' | 'mobileCta' | 'telegram'> }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    // Kadrga bir marta tekshiramiz (har bir scroll hodisasida emas)
    let queued = false
    const check = () => {
      queued = false
      // Aloqa bo'limi yoki daraja testi ekranda bo'lsa yashirinadi (tugmalarni to'smasligi uchun)
      const inView = (id: string) => {
        const r = document.getElementById(id)?.getBoundingClientRect()
        return r ? r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.3 : false
      }
      setShow(window.scrollY > window.innerHeight * 0.8 && !inView('contact') && !inView('test'))
    }
    const on = () => { if (!queued) { queued = true; requestAnimationFrame(check) } }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] transition duration-500 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-[22px] border border-white/10 bg-ink-900/90 p-2 text-white shadow-lift glass">
        <a href="#contact" data-ripple className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-sun-400 font-bold text-ink-900">{T.mobileCta} →</a>
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} aria-label={T.call} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Phone className="h-5 w-5" /></a>
        <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" aria-label={T.telegram} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#229ED9]"><Send className="h-5 w-5" /></a>
      </div>
    </div>
  )
}
