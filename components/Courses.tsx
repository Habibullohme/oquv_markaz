import { ArrowUpRight, CalendarDays, Clock, Users } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import CourseArt from './CourseArt'
import type { Dict } from '@/lib/i18n'

const ICONS = [Clock, CalendarDays, Users]

export default function Courses({ T }: { T: Dict['courses'] }) {
  return (
    <section id="courses" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
        <div className="mt-12 space-y-6 pb-8">
          {T.items.map((c, i) => {
            const featured = i === 0
            return (
              <article key={c.title} data-reveal="up" style={{ top: `calc(90px + ${i * 28}px)` }} className={`group grid gap-6 rounded-[32px] p-6 sm:p-7 md:sticky md:grid-cols-[1fr_1.2fr] md:gap-12 md:p-12 shadow-lift ${featured ? 'bg-brand-700 text-white' : ['bg-white dark:bg-ink-900 border border-slate-200 dark:border-white/10', 'bg-sun-400 text-ink-900', 'bg-ink-900 dark:bg-brand-950 text-white'][(i - 1) % 3]}`}>
                <div className="flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full chip px-3 py-1 text-xs font-bold ">{c.tag}</span>
                  <span className="font-display text-sm font-bold opacity-70">{c.level}</span>
                </div>
                <div className="mt-4 font-display text-sm font-extrabold opacity-40">{String(i + 1).padStart(2, '0')} / {String(T.items.length).padStart(2, '0')}</div>
                <CourseArt i={i} />
                </div>
                <div className="flex flex-col">
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold">{c.title}</h3>
                <p className="mt-3 text-lg leading-relaxed opacity-80">{c.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {c.meta.map((m, j) => {
                    const Icon = ICONS[j]
                    return <li key={m} className="inline-flex items-center gap-1.5 rounded-xl chip px-3 py-1.5 text-sm "><Icon className="h-4 w-4 opacity-70" />{m}</li>
                  })}
                </ul>
                <a href="#contact" data-enroll={c.title} data-magnetic data-ripple className="mt-8 inline-flex items-center gap-2 self-start rounded-full chip px-5 py-3 font-bold ">
                  {T.more} <ArrowUpRight className="h-5 w-5 transition group-hover:rotate-45" />
                </a>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
