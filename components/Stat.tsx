export default function Stat({ v, k }: { v: string, k: string }) {
  return <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-soft text-center border border-slate-100 dark:border-slate-800">
    <div className="text-3xl font-extrabold text-brand-700 dark:text-brand-300">{v}</div>
    <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{k}</div>
  </div>
}