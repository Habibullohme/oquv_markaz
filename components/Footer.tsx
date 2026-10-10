import { Instagram, Send } from 'lucide-react'
import Container from './Container'
import Logo from './Logo'
import Roll from './Roll'
import { SITE } from '@/lib/site'
import type { Dict } from '@/lib/i18n'

export default function Footer({ T }: { T: Dict }) {
  const links = (['why', 'courses', 'method', 'test', 'teachers', 'results', 'pricing', 'faq'] as const)
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 pt-14 pb-24 md:pb-10">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{T.footer.tagline}</p>
            <div className="mt-5 flex gap-2">
              <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition"><Send className="h-4 w-4" /></a>
              <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {links.map(k => <a key={k} href={`#${k}`} className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-sun-400">{T.nav[k]}</a>)}
          </nav>
        </div>
        <div data-reveal="up" className="mt-14 select-none" aria-hidden="true">
          <div className="split whitespace-nowrap font-display text-[9vw] xl:text-[7.6rem] font-extrabold leading-[0.85] tracking-tighter text-brand-700 dark:text-white">
            {Array.from('IELTS ACADEMY').map((ch, i) => <span key={i} className="sw wm-ch"><span className="ch" style={{ ['--c' as string]: i * 3 }}>{ch === ' ' ? '\u00a0' : ch}</span></span>)}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 dark:border-white/10 pt-6 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {SITE.name}. {T.footer.rights}</div>
          <a href="#home" data-magnetic className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/10 px-4 py-2 font-semibold hover:bg-brand-600 hover:text-white hover:border-brand-600 dark:hover:bg-sun-400 dark:hover:text-ink-900 transition"><Roll text={T.footer.top} /></a>
        </div>
      </Container>
    </footer>
  )
}
