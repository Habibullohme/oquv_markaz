import { Languages, Mic, Users } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import type { Dict } from '@/lib/i18n'
import MockChart from './MockChart'

// Insho varag'i: marker bilan belgilangan iboralar, qizil ruchka va "BAND 9" muhri
function EssaySheet({ stamp }: { stamp: string }) {
  const line = 'h-2 rounded-full bg-slate-200 dark:bg-white/10'
  return (
    <div className="relative mx-auto mt-8 w-full max-w-md rotate-[-2deg] rounded-2xl border border-slate-200 bg-white p-6 shadow-lift transition duration-500 group-hover:rotate-0 dark:border-white/10 dark:bg-ink-950" aria-hidden="true">
      <div className="mb-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
        <span>Writing · Task 2</span><span>250+ words</span>
      </div>
      <div className="space-y-3 text-[13px] leading-6 text-slate-600 dark:text-slate-300">
        <p><span className="hl">It is often argued that</span> technology has made our lives easier.</p>
        <div className={`${line} w-11/12`} /><div className={`${line} w-4/5`} />
        <p><span className="hl hl-2">Moreover,</span> online learning gives students more flexibility.</p>
        <div className={`${line} w-10/12`} /><div className={`${line} w-2/3`} />
        <p><span className="hl hl-3">In conclusion,</span> the benefits clearly outweigh the drawbacks.</p>
      </div>
      {/* Qizil ruchka bilan aylana va belgi */}
      <svg viewBox="0 0 200 60" className="pen absolute -right-2 top-[4.2rem] h-16 w-48" fill="none">
        <path d="M10 30 C 10 8, 150 4, 185 22 C 200 32, 170 52, 100 54 C 40 56, 4 46, 12 26" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="stamp absolute -bottom-5 -right-4 rotate-[-12deg] rounded-xl border-[3px] border-rose-600 bg-white/90 px-3 py-1.5 font-display text-lg font-extrabold tracking-wider text-rose-600 dark:bg-ink-950/90">{stamp}</span>
    </div>
  )
}

function Wave() {
  return (
    <div className="mt-6 flex h-16 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 36 }).map((_, i) => (
        <span key={i} className="wave-bar w-full flex-1 rounded-full bg-brand-500 dark:bg-sun-400"
          style={{ ['--i' as string]: i, height: `${30 + Math.abs(Math.sin(i * 0.7)) * 70}%` }} />
      ))}
    </div>
  )
}

export default function Features({ T }: { T: Dict['features'] }) {
  const tile = 'group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 dark:border-white/10 dark:bg-ink-900 md:p-8'
  return (
    <section id="why" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {/* Band 9 shablonlari */}
          <article data-reveal="up" data-spotlight className={`${tile} lg:col-span-3 lg:row-span-2 flex flex-col`}>
            <h3 className="font-display text-2xl font-bold">{T.templates.title}</h3>
            <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">{T.templates.desc}</p>
            <div className="flex flex-1 items-center pb-6"><EssaySheet stamp={T.templates.stamp} /></div>
          </article>

          {/* Haftalik mock */}
          <article data-reveal="up" data-delay="100" className={`${tile} lg:col-span-3`}>
            <h3 className="font-display text-2xl font-bold">{T.mock.title}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{T.mock.desc}</p>
            <MockChart T={T.mock} />
          </article>

          {/* Speaking klub */}
          <article data-reveal="up" data-delay="160" data-spotlight className={`${tile.replace('border-slate-200 bg-white', 'border-transparent bg-ink-900 text-white').replace('dark:border-white/10 dark:bg-ink-900', 'dark:bg-brand-950')} lg:col-span-3`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold">{T.speaking.title}</h3>
                <p className="mt-2 max-w-sm text-slate-300">{T.speaking.desc}</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sun-400 text-ink-900"><Mic className="h-6 w-6" /></span>
            </div>
            <div className="mt-5 space-y-2 text-sm" aria-hidden="true">
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-2">{T.speaking.q}</div>
              <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-sun-400 px-4 py-2 font-semibold text-ink-900">{T.speaking.a}</div>
            </div>
            <Wave />
          </article>

          {/* Ikki tilli */}
          <article data-reveal="up" data-delay="220" className={`${tile} lg:col-span-3`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold">{T.bilingual.title}</h3>
                <p className="mt-2 max-w-sm text-slate-600 dark:text-slate-400">{T.bilingual.desc}</p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-sun-400"><Languages className="h-6 w-6" /></span>
            </div>
            <div className="relative mt-6 h-28" aria-hidden="true">
              <div className="bubble-a absolute left-0 top-0 rounded-2xl rounded-bl-md bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-soft">
                <span className="mr-2 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-extrabold">UZ</span>Present Perfect = <i>hozirgacha davom etgan</i>
              </div>
              <div className="bubble-b absolute bottom-0 right-0 rounded-2xl rounded-br-md bg-sun-400 px-4 py-3 text-sm font-semibold text-ink-900 shadow-soft">
                <span className="mr-2 rounded bg-ink-900/10 px-1.5 py-0.5 text-[10px] font-extrabold">EN</span>I have lived here for 5 years.
              </div>
            </div>
          </article>

          {/* Kichik guruhlar */}
          <article data-reveal="up" data-delay="280" className={`${tile} md:col-span-2 lg:col-span-3 flex flex-col gap-6 md:flex-row md:items-center md:justify-between lg:flex-col lg:items-start`}>
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Users className="h-6 w-6" /></span>
              <div>
                <h3 className="font-display text-2xl font-bold">{T.groups.title}</h3>
                <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">{T.groups.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-4" aria-hidden="true">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className={`seat h-7 w-7 rounded-lg sm:h-8 sm:w-8 ${i < 9 ? 'bg-brand-500 dark:bg-sun-400' : 'border-2 border-dashed border-slate-300 dark:border-white/20'}`} style={{ ['--i' as string]: i }} />
                ))}
              </div>
              <div className="font-display text-3xl font-extrabold tabular-nums">9<span className="text-slate-500">/12</span>
                <div className="font-sans text-xs font-semibold text-slate-600 dark:text-slate-400">{T.groups.seats}</div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
