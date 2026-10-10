import Container from './Container'
import BandCalculator from './BandCalculator'
import type { Dict } from '@/lib/i18n'

const AVATARS = ['DS', 'ST', 'MR', 'JK']

export default function Hero({ T }: { T: Dict }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute -top-40 -right-32 h-[480px] w-[480px] rounded-full bg-brand-400/30 dark:bg-brand-600/30 blur-3xl" aria-hidden="true" />
      <div className="absolute top-60 -left-40 h-[360px] w-[360px] rounded-full bg-sun-400/30 dark:bg-sun-400/10 blur-3xl" aria-hidden="true" />

      <Container className="relative grid items-center gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-1.5 text-sm font-semibold text-brand-800 dark:text-brand-100">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
            {T.hero.eyebrow}
          </div>
          <h1 className="mt-6 font-display text-[2.4rem] leading-[1.1] sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight">
            {T.hero.titleA} <span className="marker whitespace-nowrap">{T.hero.titleMark}</span> {T.hero.titleB}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">{T.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white shadow-soft hover:bg-brand-700 hover:-translate-y-0.5 transition">{T.hero.cta1} →</a>
            <a href="#courses" className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 dark:border-white/15 px-6 py-4 font-bold hover:bg-white dark:hover:bg-white/5 transition">{T.hero.cta2}</a>
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
        <div className="animate-fade-up [animation-delay:150ms]">
          <BandCalculator labels={T.calc} />
        </div>
      </Container>
    </section>
  )
}
