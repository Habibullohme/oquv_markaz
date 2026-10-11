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
          <div className="hidden lg:block text-sm font-semibold text-slate-600 dark:text-slate-400">{T.hint}</div>
        </div>

        {/* Telefon va planshet: ixcham kartalar, chapdan "ochilib" chiqadi */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:hidden">
          {T.items.map((t, i) => {
            const dark = DARK_TEXT[i % 4]
            const band = parseFloat(t.band)
            return (
              <article key={t.name} data-reveal="wipe" data-delay={String(i * 90)}>
                <div className="wipe-body flex h-full overflow-hidden rounded-[24px] border border-slate-200 bg-white dark:border-white/10 dark:bg-ink-900">
                <div className={`relative flex w-28 shrink-0 flex-col items-center justify-center gap-2 bg-gradient-to-br sm:w-32 ${TONES[i % 4]} ${dark ? 'text-ink-900' : 'text-white'}`}>
                  <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
                  <span className="t-ini relative font-display text-3xl font-extrabold">{initials(t.name)}</span>
                  <span className="relative rounded-lg bg-white/90 px-2 py-0.5 font-display text-[11px] font-extrabold text-ink-900">IELTS {t.band}</span>
                </div>
                <div className="min-w-0 flex-1 p-5">
                  <h3 className="font-display text-lg font-bold leading-tight">{t.name}</h3>
                  <div className="mt-1 text-sm font-semibold text-brand-600 dark:text-sun-400">{t.role}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.exp}</div>
                  {/* Band shkalasi: 9 dan qancha */}
                  <div className="mt-3 flex items-center gap-2" aria-hidden="true">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <div className="grow-bar h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 dark:from-sun-300 dark:to-sun-500" style={{ width: `${(band / 9) * 100}%` }} />
                    </div>
                    <span className="font-display text-xs font-extrabold tabular-nums">{t.band}/9</span>
                  </div>
                </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Kompyuter: kengayib ochiladigan panellar */}
        <div className="mt-12 hidden h-[520px] gap-4 lg:flex">
          {T.items.map((t, i) => {
            const open = active === i
            const dark = DARK_TEXT[i % 4]
            return (
              <article key={t.name} data-reveal="up" data-delay={String(i * 110)}
                onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} tabIndex={0}
                className={`tgrow group relative min-w-0 basis-0 overflow-hidden rounded-[28px] bg-gradient-to-br ${TONES[i % 4]} ${dark ? 'text-ink-900' : 'text-white'} ${open ? 'lg:grow-[3.4]' : 'lg:grow'}`}>
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
