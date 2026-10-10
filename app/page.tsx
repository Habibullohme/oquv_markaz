'use client'
import Section from '@/components/Section'
import Container from '@/components/Container'
import Badge from '@/components/Badge'
import Stat from '@/components/Stat'
import Header from '@/components/Header'
import ContactForm from '@/components/ContactForm'
import { STR, type Lang } from '@/lib/i18n'
import { SITE } from '@/lib/site'
import { useEffect, useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'

export default function Page() {
  const [lang, setLangState] = useState<Lang>('uz')
  const T = STR[lang]

  // Saqlangan tilni faqat brauzerda, sahifa chizilgandan keyin o'qiymiz (hydration xatosi bo'lmasligi uchun)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang')
      if (saved === 'en' || saved === 'uz') setLangState(saved)
    } catch {}
  }, [])
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  function setLang(l: Lang) {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch {}
  }

  return (
    <div>
      <Header lang={lang} setLang={setLang} labels={T} />
      <Section id="home" className="pt-14">
        <Container className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge>{T.hero.badge}</Badge>
            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold leading-tight">{T.hero.title}</h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">{T.hero.subtitle}</p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#pricing" className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-white font-semibold shadow-soft hover:bg-brand-800">{T.hero.cta1}</a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-3 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">{T.hero.cta2}</a>
            </div>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><span>✔</span>{T.trust.a}</li>
              <li className="flex items-center gap-2"><span>✔</span>{T.trust.b}</li>
              <li className="flex items-center gap-2"><span>✔</span>{T.trust.c}</li>
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-brand-200 via-gold-400/30 to-brand-500/30 blur-2xl"></div>
            <div className="rounded-3xl bg-white dark:bg-slate-900 p-4 shadow-soft border border-slate-100 dark:border-slate-800">
              <img className="rounded-2xl w-full" alt="classroom" loading="eager" src="https://images.unsplash.com/photo-1610484826967-09c5720778dc?q=80&w=1200&auto=format&fit=crop" />
            </div>
          </div>
        </Container>
      </Section>

      <Section id="programs" className="bg-slate-50 dark:bg-slate-900/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">{T.programs.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{T.programs.subtitle}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {T.programs.cards.map((c, i) => (
              <div key={i} className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-soft hover:-translate-y-0.5 transition border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{c.title}</h3>
                  <span className="text-brand-600 dark:text-brand-300 text-2xl">★</span>
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{c.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {c.points.map((p: string, j: number) => <li key={j} className="flex gap-2"><span>✔</span>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="results">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">{T.results.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{T.results.subtitle}</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {T.results.stats.map((s, i) => <Stat key={i} v={s.v} k={s.k} />)}
          </div>
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 text-white shadow-soft">
            <p className="text-lg">{T.results.quote}</p>
            <div className="mt-2 text-sm opacity-90">{T.results.author}</div>
          </div>
        </Container>
      </Section>

      <Section id="pricing" className="bg-slate-50 dark:bg-slate-900/40">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">{T.pricing.title}</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {T.pricing.plans.map((p, i) => (
              <div key={i} className={`rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-soft border ${i===1 ? 'border-gold-400 ring-2 ring-gold-400/40' : 'border-slate-100 dark:border-slate-800'}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <div className="text-2xl font-extrabold text-brand-700 dark:text-brand-300">{p.price}</div>
                </div>
                <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.note}</div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  {p.features.map((f: string, j: number) => <li key={j} className="flex gap-2"><span>✔</span>{f}</li>)}
                </ul>
                <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800">{T.pricing.enroll}</a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="contact">
        <Container className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">{T.contact.title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{T.contact.subtitle}</p>
            <ContactForm labels={T.contact} />
          </div>
          <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-soft border border-slate-100 dark:border-slate-800">
            <div className="text-sm text-slate-500 dark:text-slate-400">{T.contact.findUs}</div>
            <div className="mt-2 text-lg font-bold">{SITE.name}</div>
            <div className="text-slate-600 dark:text-slate-300">{T.contact.location}</div>
            <div className="mt-4 h-64 w-full overflow-hidden rounded-xl">
              <iframe title="map" className="h-full w-full" src={SITE.mapSrc} loading="lazy"></iframe>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-brand-700 dark:hover:text-brand-300"><Phone className="h-4 w-4" />{SITE.phone}</a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-brand-700 dark:hover:text-brand-300"><Mail className="h-4 w-4" />{SITE.email}</a>
              <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-700 dark:hover:text-brand-300"><Send className="h-4 w-4" />@{SITE.telegram}</a>
            </div>
          </div>
        </Container>
      </Section>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-10">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} {SITE.name} — {T.footer.rights}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">{T.footer.address}</div>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <a href="#home" className="hover:text-brand-700 dark:hover:text-brand-300">{T.footer.top}</a>
          </div>
        </Container>
      </footer>
    </div>
  )
}
