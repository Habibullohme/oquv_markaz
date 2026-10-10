import type { Dict } from '@/lib/i18n'

export default function Ticker({ items }: { items: Dict['results']['ticker'] }) {
  const row = [...items, ...items]
  return (
    <div data-skew className="relative overflow-hidden border-y border-brand-800 bg-brand-700 py-4 text-white">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {row.map(([name, band], i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap" aria-hidden={i >= items.length}>
            <span className="font-semibold">{name}</span>
            <span className="rounded-lg bg-sun-400 px-2 py-0.5 font-display text-sm font-extrabold text-ink-900">IELTS {band}</span>
            <span className="text-brand-300">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
