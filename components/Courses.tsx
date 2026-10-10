import { ArrowUpRight, CalendarDays, Clock, Users } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

const ICONS = [Clock, CalendarDays, Users]

export default function Courses({ T }: { T: Dict['courses'] }) {
  return (
    <section id="courses" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {T.items.map((c, i) => {
            const featured = i === 0
            return (
              <article key={c.title} className={`group relative flex flex-col rounded-3xl p-7 md:p-8 transition hover:-translate-y-1 ${featured ? 'bg-brand-700 text-white shadow-lift' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 hover:shadow-lift'}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${featured ? 'bg-sun-400 text-ink-900' : 'bg-brand-50 dark:bg-white/10 text-brand-700 dark:text-brand-200'}`}>{c.tag}</span>
                  <span className={`font-display text-sm font-bold ${featured ? 'text-brand-100' : 'text-slate-400'}`}>{c.level}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{c.title}</h3>
                <p className={`mt-3 leading-relaxed ${featured ? 'text-brand-100' : 'text-slate-600 dark:text-slate-400'}`}>{c.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.meta.map((m, j) => {
                    const Icon = ICONS[j]
                    return <li key={m} className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm ${featured ? 'bg-white/10' : 'bg-slate-100 dark:bg-white/5'}`}><Icon className="h-4 w-4 opacity-70" />{m}</li>
                  })}
                </ul>
                <a href="#contact" className={`mt-8 inline-flex items-center gap-2 self-start font-bold ${featured ? 'text-sun-400' : 'text-brand-600 dark:text-sun-400'}`}>
                  {T.more} <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
