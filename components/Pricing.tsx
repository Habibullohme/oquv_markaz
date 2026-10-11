import { Check } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import Roll from './Roll'
import type { Dict } from '@/lib/i18n'

export default function Pricing({ T }: { T: Dict['pricing'] }) {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} center />
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {T.plans.map((p, i) => {
            const pop = i === 1
            return (
              <div key={p.name} data-reveal="up" data-delay={String(i * 120)} className={pop ? '-order-1 md:order-none lg:-my-5' : ''}>
                <div data-tilt className={`relative h-full rounded-[28px] ${pop ? 'glow-border' : ''}`}>
                  <div data-spotlight className={`relative flex h-full flex-col rounded-[28px] p-8 md:p-6 lg:p-8 ${pop ? 'bg-ink-900 text-white lg:py-12' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900'}`}>
                    {pop && <span className="absolute -top-3 left-8 rounded-full bg-sun-400 px-3 py-1 text-xs font-extrabold text-ink-900 shadow-soft">★ {T.popular}</span>}
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className={`font-display text-6xl md:text-5xl lg:text-6xl font-extrabold tabular-nums ${pop ? 'text-sun-400' : ''}`}>{p.price}</span>
                      <span className={pop ? 'text-slate-300' : 'text-slate-600'}>{p.per}</span>
                    </div>
                    <div className={`mt-2 text-sm ${pop ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}`}>{p.note}</div>
                    <div className={`my-6 h-px ${pop ? 'bg-white/10' : 'bg-slate-100 dark:bg-white/10'}`} />
                    <ul className="flex-1 space-y-3">
                      {p.features.map((f, j) => (
                        <li key={f} data-reveal="left" data-delay={String(200 + i * 120 + j * 70)} className="flex items-start gap-3">
                          <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pop ? 'bg-sun-400 text-ink-900' : 'bg-brand-100 dark:bg-white/10 text-brand-700 dark:text-sun-400'}`}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" data-enroll={`${p.name} · ${p.price}${p.per}`} data-magnetic data-ripple className={`mt-8 inline-flex justify-center rounded-2xl px-5 py-4 font-bold transition ${pop ? 'bg-sun-400 text-ink-900 hover:bg-sun-300' : 'bg-brand-600 text-white hover:bg-brand-700'}`}><Roll text={`${T.enroll} →`} /></a>
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
