import Link from 'next/link'
import { STR } from '@/lib/i18n'

export default function NotFound() {
  const uz = STR.uz.notFound, en = STR.en.notFound
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-4 py-20 sm:px-6">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-3xl text-center">
        <div className="font-display text-[34vw] font-extrabold leading-none tracking-tighter text-brand-700 dark:text-white sm:text-[12rem]" aria-hidden="true">
          4<span className="inline-block animate-[spin_8s_linear_infinite] text-sun-400">0</span>4
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">{uz.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-lg text-slate-600 dark:text-slate-400">{uz.text}</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-400" lang="en">{en.title}. {en.text}</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-bold text-white hover:bg-brand-700">
          ← {uz.back}
        </Link>
      </div>
    </main>
  )
}
