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
          <ol data-hscroll-track className="relative grid gap-5 pl-12 pr-4 sm:pl-14 sm:pr-6 lg:flex lg:w-max lg:gap-6 lg:px-0 lg:pr-[10vw] lg:will-change-transform">
            {/* Telefonda: scroll bilan to'ladigan vertikal chiziq */}
            <span className="absolute bottom-2 left-6 top-2 w-0.5 rounded-full bg-white/10 sm:left-8 lg:hidden" aria-hidden="true">
              <span data-vline className="block h-full w-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-sun-400 to-brand-400" />
            </span>
            {T.steps.map((s, i) => {
              const Icon = ICONS[i]
              return (
                <li key={s.title} data-reveal="up" data-delay={String(i * 120)} className="relative lg:h-[54vh] lg:w-[min(36vw,520px)]">
                  <span className="absolute -left-[31px] top-10 h-3.5 w-3.5 rounded-full border-[3px] border-ink-900 bg-sun-400 ring-4 ring-sun-400/20 lg:hidden" aria-hidden="true" />
                  <div data-spotlight className="group relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-7 sm:p-8 lg:p-10">
                  <Icon className="absolute -right-6 -top-6 h-40 w-40 text-white/[0.04] transition duration-700 group-hover:rotate-12 group-hover:scale-110" aria-hidden="true" />
                  <span className="font-display text-6xl sm:text-7xl lg:text-8xl font-extrabold text-sun-400">{String(i + 1).padStart(2, '0')}</span>
                  <div className="mt-auto">
                    <h3 className="font-display text-2xl lg:text-3xl font-bold">{s.title}</h3>
                    <p className="mt-3 max-w-sm text-lg leading-relaxed text-slate-300">{s.desc}</p>
                  </div>
                  </div>
                </li>
              )
            })}
            <li data-reveal="zoom" className="flex min-h-[220px] items-center lg:h-[54vh] lg:w-[min(36vw,520px)]">
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
