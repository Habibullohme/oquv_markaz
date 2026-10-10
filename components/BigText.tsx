// Scroll qilganda qarama-qarshi tomonga suriladigan katta yozuvlar
export default function BigText() {
  const a = 'IELTS 7.0+ • CEFR C1 • SPEAKING • WRITING • '
  const b = 'BAND 9 TEMPLATES • MOCK TESTS • FEEDBACK • '
  return (
    <section className="overflow-hidden py-10 md:py-16 select-none" aria-hidden="true">
      <div data-scroll-x="-0.5" className="whitespace-nowrap font-display text-[13vw] md:text-[8.5vw] font-extrabold leading-none tracking-tight text-brand-700 dark:text-white will-change-transform">{a + a}</div>
      <div data-scroll-x="0.5" className="-ml-[60vw] whitespace-nowrap font-display text-[13vw] md:text-[8.5vw] font-extrabold leading-none tracking-tight outline-text will-change-transform">{b + b}</div>
    </section>
  )
}
