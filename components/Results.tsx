import { Quote } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

const MIN = 4, MAX = 9
const pos = (b: number) => ((b - MIN) / (MAX - MIN)) * 100
const TICKS = [4, 5, 6, 7, 8, 9]

// IELTS band shkalasi: boshlang'ich balldan natijagacha chiziq to'lib boradi
function BandScale({ from, to }: { from: number, to: number }) {
  return (
    <div className="mt-8" aria-hidden="true">
      <div className="relative h-3 rounded-full bg-slate-100 dark:bg-white/10">
        <div className="grow-bar absolute inset-y-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-600 dark:from-sun-300 dark:to-sun-500"
          style={{ left: `${pos(from)}%`, width: `${pos(to) - pos(from)}%` }} />
        <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-slate-300 dark:border-white/30 bg-white dark:bg-ink-900" style={{ left: `${pos(from)}%` }} />
        <span className="grow-dot absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white dark:border-ink-900 bg-brand-600 dark:bg-sun-400 shadow-soft" style={{ left: `${pos(to)}%` }} />
      </div>
      <div className="relative mt-3 h-4 text-[11px] font-semibold text-slate-400 tabular-nums">
        {TICKS.map(t => <span key={t} className="absolute -translate-x-1/2" style={{ left: `${pos(t)}%` }}>{t}.0</span>)}
      </div>
    </div>
  )
}

export default function Results({ T }: { T: Dict['results'] }) {
  return (
    <section id="results" className="relative overflow-hidden bg-brand-50/60 dark:bg-white/[0.03] py-20 md:py-28">
      <div data-parallax="0.04" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-brand-300/30 dark:bg-brand-600/20 blur-3xl" aria-hidden="true" />
      <Container className="relative">
        <SectionHead eyebrow={T.eyebrow} title={T.title} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {T.items.map((r, i) => {
            const from = parseFloat(r.from), to = parseFloat(r.to)
            return (
              <figure key={r.name} data-reveal={i === 0 ? 'left' : i === 2 ? 'right' : 'up'} data-delay={String(i * 120)}>
                <div data-tilt data-spotlight className="relative flex h-full flex-col rounded-[28px] border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{T.from} → {T.to}</div>
                      <div className="mt-1 flex items-baseline gap-3 font-display font-extrabold tabular-nums">
                        <span className="text-3xl text-slate-300 dark:text-white/30 line-through decoration-2">{r.from}</span>
                        <span className="text-6xl text-brand-700 dark:text-sun-400">{r.to}</span>
                      </div>
                    </div>
                    <span className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-center font-display text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                      +{(to - from).toFixed(1)}<span className="block text-[10px] font-semibold uppercase tracking-wider">{T.gain}</span>
                    </span>
                  </div>
                  <BandScale from={from} to={to} />
                  <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    <Quote className="mb-2 h-6 w-6 text-brand-300 dark:text-white/30" aria-hidden="true" />
                    {r.quote}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4 text-sm">
                    <span className="flex items-center gap-3 font-bold">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs text-white">{r.name.split(' ').map(w => w[0]).join('')}</span>
                      {r.name}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">{r.weeks} {T.weeks}</span>
                  </figcaption>
                </div>
              </figure>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
