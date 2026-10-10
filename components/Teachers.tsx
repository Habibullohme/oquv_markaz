import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

const TONES = ['from-brand-500 to-brand-800', 'from-sun-400 to-sun-500', 'from-emerald-400 to-emerald-700', 'from-rose-400 to-rose-600']

export default function Teachers({ T }: { T: Dict['teachers'] }) {
  return (
    <section id="teachers" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {T.items.map((t, i) => (
            <article key={t.name} className="group rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-ink-900 p-3 transition hover:-translate-y-1 hover:shadow-lift">
              <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${TONES[i % TONES.length]}`}>
                <span className="font-display text-5xl font-extrabold text-white/90">{t.name.split(' ').map(w => w[0]).join('')}</span>
                <span className="absolute right-3 top-3 rounded-xl bg-white/95 px-2.5 py-1 font-display text-xs font-extrabold text-ink-900">IELTS {t.band}</span>
              </div>
              <div className="px-3 pb-3 pt-4">
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <div className="mt-1 text-sm font-semibold text-brand-600 dark:text-sun-400">{t.role}</div>
                <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.exp}</div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
