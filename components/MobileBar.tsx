'use client'
import { useEffect, useState } from 'react'
import { Phone, Send } from 'lucide-react'
import { SITE } from '@/lib/site'
import type { Dict } from '@/lib/i18n'

// Telefonda: bosh qismdan o'tgach pastda paydo bo'ladigan panel. Aloqa bo'limiga yetganda yashirinadi.
export default function MobileBar({ T }: { T: Dict }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => {
      const c = document.getElementById('contact')?.getBoundingClientRect()
      const nearContact = c ? c.top < window.innerHeight && c.bottom > 0 : false
      setShow(window.scrollY > window.innerHeight * 0.8 && !nearContact)
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)] transition duration-500 ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`}>
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-[22px] border border-white/10 bg-ink-900/90 p-2 text-white shadow-lift glass">
        <a href="#contact" className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-sun-400 font-bold text-ink-900">{T.mobileCta} →</a>
        <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} aria-label={T.call} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Phone className="h-5 w-5" /></a>
        <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" aria-label={T.telegram} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#229ED9]"><Send className="h-5 w-5" /></a>
      </div>
    </div>
  )
}
