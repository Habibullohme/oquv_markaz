export default function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-100 px-3 py-1 text-sm font-medium shadow-soft">
    <i className="lucide lucide-graduation-cap" /> {children}
  </span>
}