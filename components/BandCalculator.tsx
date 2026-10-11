'use client'
import { useState } from 'react'
import type { Dict } from '@/lib/i18n'
import { fill, prefillContact } from '@/lib/prefill'

type Skill = 'L' | 'R' | 'W' | 'S'
const SKILLS: Skill[] = ['L', 'R', 'W', 'S']

// IELTS qoidasi: o'rtacha ball eng yaqin 0.5 ga yaxlitlanadi (.25 → .5, .75 → keyingi butun)
export function overallBand(scores: number[]) {
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  return Math.round(avg * 2) / 2
}

export function cefrFor(band: number) {
  if (band >= 8.5) return 'C2'
  if (band >= 7) return 'C1'
  if (band >= 5.5) return 'B2'
  if (band >= 4) return 'B1'
  return 'A2'
}

export default function BandCalculator({ labels, prefill }: { labels: Dict['calc'], prefill: string }) {
  const [s, setS] = useState<Record<Skill, number>>({ L: 7, R: 6.5, W: 6, S: 6.5 })
  const overall = overallBand(SKILLS.map(k => s[k]))
  const R = 52, C = 2 * Math.PI * R

  return (
    <div className="relative rounded-[28px] border border-brand-100 dark:border-white/10 bg-white/90 dark:bg-ink-900/80 glass p-6 md:p-7 shadow-lift">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-display text-lg font-bold">{labels.title}</div>
          <p className="mt-1 max-w-[30ch] text-sm text-slate-600 dark:text-slate-400">{labels.hint}</p>
        </div>
        <div className="relative h-[124px] w-[124px] shrink-0">
          <svg viewBox="0 0 124 124" className="h-full w-full -rotate-90">
            <circle cx="62" cy="62" r={R} fill="none" strokeWidth="10" className="stroke-brand-100 dark:stroke-white/10" />
            <circle cx="62" cy="62" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - overall / 9)}
              className="stroke-brand-600 dark:stroke-sun-400 transition-[stroke-dashoffset] duration-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="font-display text-4xl font-extrabold tabular-nums" aria-live="polite">{overall.toFixed(1)}</div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">{labels.overall}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {SKILLS.map(k => (
          <div key={k}>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor={`band-${k}`} className="font-semibold">{labels.skills[k]}</label>
              <span className="rounded-md bg-brand-50 dark:bg-white/10 px-2 py-0.5 font-display text-xs font-bold tabular-nums text-brand-700 dark:text-sun-400">{s[k].toFixed(1)}</span>
            </div>
            <input id={`band-${k}`} type="range" min={3} max={9} step={0.5} value={s[k]}
              onChange={e => setS({ ...s, [k]: Number(e.target.value) })} className="band mt-1"
              style={{ ['--p' as string]: `${((s[k] - 3) / 6) * 100}%` }} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-brand-50 dark:bg-white/5 px-4 py-3">
        <div className="text-sm text-slate-600 dark:text-slate-300">{labels.cefr}</div>
        <div className="font-display text-xl font-extrabold text-brand-700 dark:text-sun-400">{cefrFor(overall)}</div>
      </div>
      <a href="#contact" onClick={() => prefillContact(fill(prefill, { band: overall.toFixed(1), cefr: cefrFor(overall) }))} className="mt-4 flex w-full items-center justify-center rounded-2xl bg-ink-900 dark:bg-sun-400 px-4 py-3 text-sm font-bold text-white dark:text-ink-900 hover:bg-brand-700 dark:hover:bg-sun-300 transition">
        {labels.cta} →
      </a>
    </div>
  )
}
