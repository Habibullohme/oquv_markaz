import { Check } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

export default function Pricing({ T }: { T: Dict['pricing'] }) {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} center />
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {T.plans.map((p, i) => {
            const pop = i === 1
            return (
              <div key={p.name} className={`relative flex flex-col rounded-3xl p-8 ${pop ? 'bg-ink-900 dark:bg-brand-700 text-white shadow-lift lg:-my-4 lg:py-12' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900'}`}>
                {pop && <span className="absolute -top-3 left-8 rounded-full bg-sun-400 px-3 py-1 text-xs font-extrabold text-ink-900">{T.popular}</span>}
                <h3 className="font-display text-lg font-bold">{p.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tabular-nums">{p.price}</span>
                  <span className={pop ? 'text-slate-300' : 'text-slate-500'}>{p.per}</span>
                </div>
                <div className={`mt-2 text-sm ${pop ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{p.note}</div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map(f => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${pop ? 'bg-sun-400 text-ink-900' : 'bg-brand-100 dark:bg-white/10 text-brand-700 dark:text-sun-400'}`}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-8 inline-flex justify-center rounded-2xl px-5 py-3.5 font-bold transition ${pop ? 'bg-sun-400 text-ink-900 hover:bg-sun-300' : 'bg-brand-600 text-white hover:bg-brand-700'}`}>{T.enroll}</a>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
