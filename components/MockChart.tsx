'use client'
import { useState } from 'react'
import type { Dict } from '@/lib/i18n'

// NAMUNA: bitta o'quvchining 8 haftalik mock natijalari
const MOCK = [5.5, 5.5, 6.0, 6.0, 6.5, 6.5, 7.0, 7.5]
const Y_MIN = 4, Y_MAX = 9

export default function MockChart({ T }: { T: Dict['features']['mock'] }) {
  const [hover, setHover] = useState<number | null>(null)
  const last = MOCK.length - 1
  return (
    <figure className="mt-6" aria-label={T.chart}>
      <div className="relative h-40">
        {/* Yordamchi chiziqlar: 5, 6, 7, 8 */}
        {[5, 6, 7, 8].map(v => (
          <div key={v} className="absolute inset-x-0 border-t border-dashed border-slate-200 dark:border-white/10" style={{ bottom: `${((v - Y_MIN) / (Y_MAX - Y_MIN)) * 100}%` }}>
            <span className="absolute -top-2.5 right-0 bg-white dark:bg-ink-900 pl-1 text-[10px] font-semibold text-slate-500 tabular-nums">{v}.0</span>
          </div>
        ))}
        <div className="absolute inset-0 right-8 flex items-end gap-[2px]">
          {MOCK.map((v, i) => {
            const h = ((v - Y_MIN) / (Y_MAX - Y_MIN)) * 100
            const on = hover === i
            return (
              <button key={i} type="button" aria-label={`${i + 1} ${T.week}: ${v.toFixed(1)}`}
                onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)} onClick={() => setHover(on ? null : i)}
                className="group relative flex h-full flex-1 items-end justify-center">
                <span className="bar-grow block w-full max-w-[28px] rounded-t-[4px] bg-brand-500 transition-colors dark:bg-sun-400 group-hover:bg-brand-700 dark:group-hover:bg-sun-300"
                  style={{ height: `${h}%`, ['--i' as string]: i }} />
                {(on || (hover === null && i === last)) && (
                  <span className="pointer-events-none absolute z-10 -translate-y-2 whitespace-nowrap rounded-lg bg-ink-900 px-2 py-1 text-xs font-bold text-white shadow-soft dark:bg-white dark:text-ink-900" style={{ bottom: `${h}%` }}>
                    {v.toFixed(1)}{on && <span className="ml-1 font-medium opacity-70">· {i + 1} {T.week}</span>}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
      <div className="mr-8 mt-2 flex gap-[2px] text-center text-[10px] font-semibold text-slate-500 tabular-nums" aria-hidden="true">
        {MOCK.map((_, i) => <span key={i} className="flex-1">{i + 1}</span>)}
      </div>
      <figcaption className="mt-1 text-xs text-slate-600 dark:text-slate-400">{T.chart}</figcaption>
    </figure>
  )
}

