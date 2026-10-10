import { Plus } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'

export default function Faq({ T }: { T: Dict['faq'] }) {
  return (
    <section id="faq" className="py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHead eyebrow={T.eyebrow} title={T.title} />
        <div className="divide-y divide-slate-200 dark:divide-white/10 border-y border-slate-200 dark:border-white/10">
          {T.items.map((f, i) => (
            <details key={f.q} data-reveal="up" data-delay={String(i * 80)} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-white/15 transition group-open:rotate-45 group-open:bg-brand-600 group-open:border-brand-600 group-open:text-white"><Plus className="h-4 w-4" /></span>
              </summary>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-slate-600 dark:text-slate-400">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
