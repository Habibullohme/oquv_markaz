'use client'
import { useState } from 'react'
import { ArrowRight, Check, RotateCcw, X } from 'lucide-react'
import Container from './Container'
import SectionHead from './SectionHead'
import Roll from './Roll'
import { cefrFor } from './BandCalculator'
import { fill, prefillContact } from '@/lib/prefill'
import type { Dict } from '@/lib/i18n'
import { firstSet, randomSet, type Question } from '@/lib/quiz-bank'

// To'g'ri javoblar soni → taxminiy IELTS band va tavsiya etilgan kurs (kurslar ro'yxatidagi indeks)
const RESULT = [
  { max: 2, band: 4.0, range: '3.5–4.0', course: 1 },
  { max: 4, band: 5.0, range: '4.5–5.0', course: 1 },
  { max: 6, band: 6.0, range: '5.5–6.5', course: 0 },
  { max: 7, band: 7.0, range: '7.0–7.5', course: 0 },
  { max: 8, band: 8.0, range: '7.5+', course: 3 },
]

export default function Quiz({ T, courses }: { T: Dict['quiz'], courses: Dict['courses']['items'] }) {
  const [step, setStep] = useState(-1)               // -1: boshlanish, 0..7: savol, 8: natija
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [QUESTIONS, setQuestions] = useState<Question[]>(firstSet)

  const q = QUESTIONS[step]
  const done = step >= QUESTIONS.length
  const res = RESULT.find(r => score <= r.max)!
  const level = cefrFor(res.band)

  function choose(i: number) {
    if (picked !== null) return
    setPicked(i)
    if (i === q.a) setScore(s => s + 1)
  }
  function next() { setPicked(null); setStep(s => s + 1) }
  // Har safar boshlanganda yangi savollar to'plami (qayta topshirganda oldingisidan farqli)
  function begin() { setQuestions(prev => randomSet(prev)); setPicked(null); setScore(0); setStep(0) }
  function send() {
    prefillContact(fill(T.prefill, { level, band: res.range, score, course: courses[res.course].title }))
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="test" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-1/2 -z-10 h-[60%] -translate-y-1/2 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" aria-hidden="true" />
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
        <div>
          <SectionHead eyebrow={T.eyebrow} title={T.title} subtitle={T.subtitle} />
          <div data-reveal="up" data-delay="200" className="mt-8 flex flex-wrap gap-2 text-sm font-bold" aria-hidden="true">
            {['A2', 'B1', 'B2', 'C1'].map((l, i) => (
              <span key={l} className={`rounded-xl px-3 py-1.5 ${done && l === level ? 'bg-sun-400 text-ink-900' : 'chip'}`} style={{ opacity: 0.55 + i * 0.15 }}>{l}</span>
            ))}
          </div>
        </div>

        <div data-reveal="zoom" className="relative">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-lift dark:border-white/10 dark:bg-ink-900 sm:p-8 md:p-10">
            {/* Progress */}
            <div className="absolute inset-x-0 top-0 h-1.5 bg-slate-100 dark:bg-white/5">
              <div className="h-full bg-gradient-to-r from-brand-500 to-sun-400 transition-[width] duration-500" style={{ width: `${(Math.max(0, Math.min(step, QUESTIONS.length)) / QUESTIONS.length) * 100}%` }} />
            </div>

            {step === -1 && (
              <div key="start" className="quiz-in flex min-h-[340px] flex-col items-center justify-center text-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-brand-50 dark:bg-white/5">
                  <span className="absolute inset-0 rounded-full border-2 border-dashed border-brand-300 dark:border-white/20 animate-[spin_20s_linear_infinite]" aria-hidden="true" />
                  <span className="font-display text-3xl font-extrabold text-brand-700 dark:text-sun-400">A→C</span>
                </div>
                <button type="button" onClick={begin} data-magnetic className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-brand-600 px-7 py-4 font-bold text-white hover:bg-brand-700 dark:bg-sun-400 dark:text-ink-900 dark:hover:bg-sun-300">
                  <Roll text={T.start} /><ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {q && (
              <div key={step} className="quiz-in min-h-[340px]">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span>{T.question} {step + 1}{T.of}{QUESTIONS.length}</span>
                  <span className="rounded-lg bg-brand-50 px-2 py-0.5 font-display text-xs font-extrabold text-brand-700 dark:bg-white/10 dark:text-sun-400">{q.lvl}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-snug md:text-[1.7rem]">{q.q}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {q.o.map((o, i) => {
                    const isAns = picked !== null && i === q.a
                    const isWrong = picked === i && i !== q.a
                    return (
                      <button key={`${step}-${o}`} type="button" onClick={() => choose(i)} disabled={picked !== null}
                        className={`flex items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left font-semibold transition duration-300 ${isAns ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300' : isWrong ? 'quiz-shake border-rose-500 bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300' : 'border-slate-200 hover:border-brand-400 hover:bg-brand-50/50 dark:border-white/10 dark:hover:border-sun-400/60 dark:hover:bg-white/5'} ${picked !== null && !isAns && !isWrong ? 'opacity-50' : ''}`}>
                        <span><span className="mr-3 font-display text-xs font-extrabold opacity-50">{'ABCD'[i]}</span>{o}</span>
                        {isAns && <Check className="h-5 w-5 shrink-0" />}
                        {isWrong && <X className="h-5 w-5 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="button" onClick={next} disabled={picked === null}
                    className="inline-flex items-center gap-2 rounded-2xl bg-ink-900 px-6 py-3.5 font-bold text-white transition disabled:pointer-events-none disabled:opacity-30 dark:bg-white dark:text-ink-900">
                    {step === QUESTIONS.length - 1 ? T.finish : T.next}<ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {done && (
              <div key="result" className="quiz-in min-h-[340px]">
                <div className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-sun-400">{T.result}</div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-brand-600 p-5 text-white">
                    <div className="text-xs font-semibold opacity-80">{T.level}</div>
                    <div className="mt-1 font-display text-5xl font-extrabold">{level}</div>
                  </div>
                  <div className="rounded-2xl bg-sun-400 p-5 text-ink-900">
                    <div className="text-xs font-semibold opacity-70">{T.band}</div>
                    <div className="mt-1 font-display text-4xl font-extrabold tabular-nums">{res.range}</div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 p-5 dark:border-white/10">
                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{score}/{QUESTIONS.length}</div>
                    <div className="mt-1 font-display text-lg font-bold">{T.correct}</div>
                    <div className="mt-3 flex gap-1" aria-hidden="true">
                      {QUESTIONS.map((_, i) => <span key={i} className={`h-2 flex-1 rounded-full ${i < score ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-white/10'}`} />)}
                    </div>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl bg-slate-50 p-5 dark:bg-white/5">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">{T.recommend}</div>
                  <div className="mt-1 font-display text-2xl font-bold">{courses[res.course].title}</div>
                  <div className="mt-1 text-slate-600 dark:text-slate-400">{courses[res.course].desc}</div>
                </div>
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{T.approx}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="button" onClick={send} data-magnetic className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700 dark:bg-sun-400 dark:text-ink-900 sm:flex-none">
                    <span>{T.cta}</span><ArrowRight className="h-5 w-5 shrink-0" />
                  </button>
                  <button type="button" onClick={begin} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-5 py-4 font-bold dark:border-white/15">
                    <RotateCcw className="h-4 w-4" />{T.retry}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
