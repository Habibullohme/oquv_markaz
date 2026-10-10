import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import Container from './Container'
import ContactForm from './ContactForm'
import { SITE } from '@/lib/site'
import type { Dict } from '@/lib/i18n'

export default function Contact({ T }: { T: Dict['contact'] }) {
  const rows = [
    { Icon: Phone, text: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    { Icon: Send, text: `@${SITE.telegram}`, href: `https://t.me/${SITE.telegram}` },
    { Icon: Mail, text: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: MapPin, text: T.location, href: SITE.mapLink },
    { Icon: Clock, text: T.hours },
  ]
  return (
    <section id="contact" className="py-20 md:py-28">
      <Container>
        <div data-reveal="zoom" className="relative overflow-hidden rounded-[32px] bg-brand-700 p-6 sm:p-10 md:p-14 text-white">
          <div data-parallax="0.05" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sun-400/30 blur-3xl" aria-hidden="true" />
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-sun-400">{T.eyebrow}</div>
              <h2 className="mt-3 font-display text-3xl md:text-[2.6rem] md:leading-[1.15] font-bold">{T.title}</h2>
              <p className="mt-4 max-w-md text-lg text-brand-100">{T.subtitle}</p>
              <ul className="mt-8 space-y-3">
                {rows.map(({ Icon, text, href }) => (
                  <li key={text}>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-sun-400"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Icon className="h-5 w-5" /></span>{text}</a>
                      : <span className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Icon className="h-5 w-5" /></span>{text}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-white dark:bg-ink-900 p-6 md:p-8 text-ink-900 dark:text-slate-100 shadow-lift">
              <ContactForm labels={T} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
