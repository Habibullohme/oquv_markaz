'use client'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

const TONES = [
  'from-brand-500 via-brand-700 to-brand-950',
  'from-sun-300 via-sun-400 to-sun-500',
  'from-emerald-300 via-emerald-500 to-emerald-800',
  'from-rose-300 via-rose-500 to-rose-800',
]
const DARK_TEXT = [false, true, false, false]

const initials = (n: string) => n.split(' ').map(w => w[0]).join('')

// Katta ekranda: sichqoncha olib borilgan panel kengayib ochiladi. Telefonda: yon tomonga suriladigan kartalar.
export default function Teachers({ T }: { T: Dict['teachers'] }) {
  const [active, setActive] = useState(0)
  return (
    <section id="teachers" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
          <div className="hidden lg:block text-sm font-semibold text-slate-500 dark:text-slate-400">{T.hint}</div>
          <div className="lg:hidden inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400"><span className="inline-block animate-[nudge_1.6s_ease-in-out_infinite]">←</span>{T.swipe}<span className="inline-block animate-[nudge_1.6s_ease-in-out_infinite_reverse]">→</span></div>
        </div>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:h-[520px] lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none]">
          {T.items.map((t, i) => {
            const open = active === i
            const dark = DARK_TEXT[i % 4]
            return (
              <article key={t.name} data-reveal="up" data-delay={String(i * 110)}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} tabIndex={0}
                className={`tgrow group relative min-h-[420px] w-[78%] shrink-0 snap-start overflow-hidden rounded-[28px] bg-gradient-to-br ${TONES[i % 4]} ${dark ? 'text-ink-900' : 'text-white'} sm:w-[46%] lg:min-h-0 lg:w-auto lg:min-w-0 lg:basis-0 lg:shrink lg:transition-[flex-grow] lg:duration-700 lg:ease-[cubic-bezier(.7,0,.2,1)] ${open ? 'lg:grow-[3.4]' : 'lg:grow'}`}>
                {/* Katta bosh harflar fonda */}
                <span aria-hidden="true" className={`pointer-events-none absolute -bottom-10 -right-6 font-display text-[11rem] font-extrabold leading-none opacity-20 transition-transform duration-700 ${open ? 'lg:scale-100 lg:rotate-0' : 'lg:scale-75 lg:-rotate-12'}`}>{initials(t.name)}</span>
                <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />

                {/* Yopiq holat (faqat katta ekran) */}
                <div className={`absolute inset-0 hidden flex-col items-center justify-between py-8 transition-opacity duration-300 lg:flex ${open ? 'opacity-0' : 'opacity-100 delay-300'}`}>
                  <span className="rounded-xl bg-white/90 px-2 py-1 font-display text-xs font-extrabold text-ink-900">{t.band}</span>
                  <span className="font-display text-xl font-bold [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">{t.name}</span>
                </div>

                {/* Ochiq holat */}
                <div className={`relative flex h-full flex-col p-7 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[480px] lg:p-9 transition-all duration-500 ${open ? 'lg:opacity-100 lg:translate-y-0 lg:delay-300' : 'lg:pointer-events-none lg:opacity-0 lg:translate-y-6'}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-lg font-extrabold ${dark ? 'bg-ink-900 text-sun-400' : 'bg-white/15'}`}>{initials(t.name)}</span>
                    <ArrowUpRight className="h-7 w-7 transition duration-500 group-hover:rotate-45" aria-hidden="true" />
                  </div>
                  <div className="mt-auto">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] opacity-70">IELTS</div>
                    <div className="font-display text-7xl lg:text-8xl font-extrabold leading-none tabular-nums">{t.band}</div>
                    <h3 className="mt-6 font-display text-2xl lg:text-3xl font-bold whitespace-nowrap">{t.name}</h3>
                    <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
                      <span className="chip rounded-full px-3 py-1">{t.role}</span>
                      <span className="chip rounded-full px-3 py-1">{t.exp}</span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
