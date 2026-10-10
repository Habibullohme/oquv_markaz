export default function SectionHead({ eyebrow, title, subtitle, center = false, light = false }: { eyebrow: string, title: string, subtitle?: string, center?: boolean, light?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <div className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-sun-400' : 'text-brand-600 dark:text-sun-400'}`}>{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-[2.6rem] md:leading-[1.15] font-bold tracking-tight">{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${light ? 'text-brand-100' : 'text-slate-600 dark:text-slate-400'}`}>{subtitle}</p>}
    </div>
  )
}
