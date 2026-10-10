import { Fragment } from 'react'
import Container from './Container'
import BandCalculator from './BandCalculator'
import type { Dict } from '@/lib/i18n'

const AVATARS = ['DS', 'ST', 'MR', 'JK']

// Sarlavhani so'zlarga bo'lib, har birini navbat bilan chiqaramiz
function Words({ text, start, className = '' }: { text: string, start: number, className?: string }) {
  return <>{text.split(' ').map((w, i) => (
    <Fragment key={i}><span className="word"><span className={className} style={{ ['--i' as string]: start + i }}>{w}</span></span>{' '}</Fragment>
  ))}</>
}

function SpinBadge() {
  const text = 'LISTENING • READING • WRITING • SPEAKING • '
  return (
    <div className="absolute -bottom-12 -left-12 z-10 hidden h-28 w-28 sm:block" data-parallax="0.02">
      <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_14s_linear_infinite]" aria-hidden="true">
        <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
        <text className="fill-ink-900 dark:fill-white" style={{ fontSize: 7.4, fontWeight: 800, letterSpacing: 0.4 }}><textPath href="#circ" textLength="236" lengthAdjust="spacing">{text}</textPath></text>
      </svg>
      <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-sun-400 font-display text-sm font-extrabold text-ink-900">9.0</div>
    </div>
  )
}

export default function Hero({ T }: { T: Dict }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]" aria-hidden="true" />
      <div data-parallax="0.06" className="absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-brand-400/30 dark:bg-brand-600/30 blur-3xl" aria-hidden="true" />
      <div data-parallax="-0.08" className="absolute top-60 -left-40 h-[360px] w-[360px] rounded-full bg-sun-400/30 dark:bg-sun-400/10 blur-3xl" aria-hidden="true" />

      <Container className="relative grid items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-sm font-semibold text-brand-800 dark:text-brand-100">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
            {T.hero.eyebrow}
          </div>
          <h1 className="mt-6 font-display text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight">
            <Words text={T.hero.titleA} start={0} />
            <span className="word"><span className="marker" style={{ ['--i' as string]: 2 }}>{T.hero.titleMark}</span></span>{' '}
            <Words text={T.hero.titleB} start={3} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{T.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" data-magnetic className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white shadow-soft hover:bg-brand-700 hover:-translate-y-0.5 transition">{T.hero.cta1} →</a>
            <a href="#courses" data-magnetic className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-white/15 px-6 py-4 font-bold hover:bg-white dark:hover:bg-white/5 transition">{T.hero.cta2}</a>
          </div>
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {AVATARS.map((a, i) => (
                <div key={a} className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-paper dark:border-ink-950 text-xs font-bold text-white ${['bg-brand-600', 'bg-sun-500', 'bg-emerald-500', 'bg-rose-500'][i]}`}>{a}</div>
              ))}
            </div>
            <div>
              <div className="text-sun-500" aria-hidden="true">★★★★★</div>
              <div className="text-sm font-semibold">{T.hero.students}</div>
            </div>
          </div>
        </div>
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <SpinBadge />
          <div data-tilt className="relative rounded-[28px]">
            <BandCalculator labels={T.calc} />
          </div>
        </div>
      </Container>
    </section>
  )
}
