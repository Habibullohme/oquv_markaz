import { Quote } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

export default function Results({ T }: { T: Dict['results'] }) {
  return (
    <section id="results" className="bg-brand-50/60 dark:bg-white/[0.03] py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {T.items.map(r => (
            <figure key={r.name} className="flex flex-col rounded-3xl bg-white dark:bg-ink-900 border border-slate-200 dark:border-white/10 p-7">
              <div className="flex items-end gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{T.from}</div>
                  <div className="font-display text-3xl font-bold text-slate-400 tabular-nums">{r.from}</div>
                </div>
                <div className="mb-2 h-px flex-1 bg-gradient-to-r from-slate-300 to-brand-500 dark:from-white/20 dark:to-sun-400" aria-hidden="true" />
                <div className="text-right">
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-sun-400">{T.to}</div>
                  <div className="font-display text-5xl font-extrabold text-brand-700 dark:text-sun-400 tabular-nums">{r.to}</div>
                </div>
              </div>
              <blockquote className="mt-6 flex-1 leading-relaxed text-slate-700 dark:text-slate-300">
                <Quote className="mb-2 h-5 w-5 text-brand-300 dark:text-white/30" aria-hidden="true" />
                {r.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-4 text-sm">
                <span className="font-bold">{r.name}</span>
                <span className="text-slate-500 dark:text-slate-400">{r.weeks} {T.weeks}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
