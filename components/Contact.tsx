import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import Container from './Container'
import ContactForm from './ContactForm'
import Split from './Split'
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
          <div className="contact-orbs absolute inset-0" aria-hidden="true"><span /><span /><span /></div>
          <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-sun-400">{T.eyebrow}</div>
              <h2 className="mt-3 font-display text-3xl md:text-5xl md:leading-[1.1] font-bold"><Split text={T.title} /></h2>
              <p className="mt-4 max-w-md text-lg text-brand-100">{T.subtitle}</p>
              <ul className="mt-8 space-y-3">
                {rows.map(({ Icon, text, href }, i) => (
                  <li key={text} data-reveal="left" data-delay={String(250 + i * 80)}>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="group inline-flex items-center gap-3 hover:text-sun-400"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition duration-300 group-hover:bg-sun-400 group-hover:text-ink-900 group-hover:-rotate-6"><Icon className="h-5 w-5" /></span>{text}</a>
                      : <span className="inline-flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><Icon className="h-5 w-5" /></span>{text}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal="right" data-delay="200" className="rounded-[28px] bg-white dark:bg-ink-900 p-6 md:p-8 text-ink-900 dark:text-slate-100 shadow-lift">
              <ContactForm labels={T} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
