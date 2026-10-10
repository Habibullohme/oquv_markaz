import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

export default function Method({ T }: { T: Dict['method'] }) {
  return (
    <section id="method" className="relative overflow-hidden bg-ink-900 py-20 md:py-28 text-white">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <Container className="relative">
        <SectionHead eyebrow={T.eyebrow} title={T.title} light />
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {T.steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-5xl font-extrabold text-sun-400">{String(i + 1).padStart(2, '0')}</span>
                {i < T.steps.length - 1 && <span className="hidden lg:block h-px flex-1 bg-gradient-to-r from-white/30 to-transparent" aria-hidden="true" />}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-300">{s.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
