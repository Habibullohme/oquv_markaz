export default function Logo() {
  return (
    <a href="#home" className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 font-display text-sm font-extrabold text-white">
        IA<span className="text-sun-400">.</span>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-bold">IELTS Academy</span>
        <span className="block text-xs text-slate-500 dark:text-slate-400">Band 7+ · CEFR B1–C1</span>
      </span>
    </a>
  )
}
