'use client'
import { useEffect, useRef, useState } from 'react'
import Container from './Container'
import type { Dict } from '@/lib/i18n'

function Counter({ value, decimals, prefix, suffix }: { value: number, decimals: number, prefix: string, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [n, setN] = useState(value)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    // Har safar ekranga kirganda 0 dan qayta sanaydi
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) { cancelAnimationFrame(raf); setN(0); return }
      if (e.intersectionRatio < 0.5) return
      cancelAnimationFrame(raf)
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 1200)
        setN(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: [0, 0.5] })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  const text = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US').replace(/,/g, ' ')
  return <span ref={ref} className="tabular-nums">{prefix}{text}{suffix}</span>
}

export default function Stats({ items }: { items: Dict['stats'] }) {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-white/10 lg:grid-cols-4">
          {items.map((s, i) => (
            <div key={i} data-reveal="zoom" data-delay={String(i * 100)} className="bg-white dark:bg-ink-900 p-6 md:p-8">
              <div className="font-display text-3xl md:text-5xl font-extrabold text-brand-700 dark:text-white">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
