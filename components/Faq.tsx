'use client'
import { useState } from 'react'
import { Plus, Send } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import Roll from './Roll'
import { SITE } from '@/lib/site'
import type { Dict } from '@/lib/i18n'

export default function Faq({ T }: { T: Dict['faq'] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead eyebrow={T.eyebrow} title={T.title} />
          <div data-reveal="up" data-delay="200" className="relative mt-10 overflow-hidden rounded-[28px] bg-brand-700 p-7 text-white">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sun-400/30 blur-2xl animate-float" aria-hidden="true" />
            <div className="relative">
              <div className="font-display text-xl font-bold">{T.askTitle}</div>
              <p className="mt-2 text-brand-100">{T.askText}</p>
              <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" data-magnetic className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-ink-900 hover:bg-sun-400 transition">
                <Send className="h-4 w-4" /><Roll text={T.askCta} />
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {T.items.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} data-reveal="up" data-delay={String(i * 80)}
                className={`tcolors rounded-[22px] border transition-colors duration-500 ${isOpen ? 'border-brand-600 bg-white dark:bg-ink-900 shadow-soft dark:border-sun-400/60' : 'border-slate-200 dark:border-white/10 hover:border-brand-300 dark:hover:border-white/25'}`}>
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-lg font-bold">
                  {f.q}
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition duration-500 ${isOpen ? 'rotate-[135deg] bg-brand-600 text-white dark:bg-sun-400 dark:text-ink-900' : 'border border-slate-300 dark:border-white/15'}`}><Plus className="h-4 w-4" /></span>
                </button>
                <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className={`max-w-[60ch] px-6 pb-6 leading-relaxed text-slate-600 dark:text-slate-400 transition duration-500 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
