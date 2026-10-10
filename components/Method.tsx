import { ArrowUpRight, ClipboardCheck, Map, Timer, Trophy } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import Roll from './Roll'
import type { Dict } from '@/lib/i18n'

const ICONS = [ClipboardCheck, Map, Timer, Trophy]

// Katta ekranda: bo'lim "qotib qoladi" va vertikal scroll kartalarni gorizontal suradi
export default function Method({ T }: { T: Dict['method'] }) {
  return (
    <section id="method" data-hscroll className="relative bg-ink-900 text-white lg:h-[320vh]">
      <div className="relative overflow-hidden py-20 md:py-28 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0">
        <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
        <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" aria-hidden="true" />
        <Container className="relative flex w-full items-end justify-between gap-6">
          <SectionHead eyebrow={T.eyebrow} title={T.title} light />
          <div className="hidden lg:block text-sm font-semibold text-slate-400">{T.scroll}</div>
        </Container>
        <div className="relative mt-12 lg:mt-14 lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          <ol data-hscroll-track className="grid gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:flex lg:w-max lg:gap-6 lg:px-0 lg:pr-[10vw] will-change-transform">
            {T.steps.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <li key={s.title} data-reveal="up" data-delay={String(i * 120)} data-spotlight className="group relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 lg:h-[54vh] lg:w-[min(36vw,520px)] lg:p-10">
                  <Icon className="absolute -right-6 -top-6 h-40 w-40 text-white/[0.04] transition duration-700 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                  <span className="font-display text-7xl lg:text-8xl font-extrabold text-sun-400">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-auto">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold">{s.title}</h3>
                    <p className="mt-3 max-w-sm text-lg leading-relaxed text-slate-300">{s.desc}</p>
                  </div>
                </li>
              )
            })}
            <li data-reveal="zoom" className="flex min-h-[220px] items-center sm:col-span-2 lg:h-[54vh] lg:w-[min(36vw,520px)]">
              <a href="#contact" data-magnetic className="group flex aspect-square w-full max-w-[320px] flex-col items-center justify-center gap-3 rounded-full bg-sun-400 p-10 text-center font-display text-xl font-extrabold text-ink-900 transition hover:bg-sun-300 mx-auto">
                <ArrowUpRight className="h-10 w-10 transition duration-500 group-hover:rotate-45" />
                <Roll text={T.cta} />
              </a>
            </li>
          </ol>
          <div className="mx-auto mt-10 hidden h-px max-w-7xl bg-white/10 lg:block lg:mr-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ml-0">
            <div data-hscroll-bar className="h-px origin-left scale-x-0 bg-sun-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
