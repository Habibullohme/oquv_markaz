'use client'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Stats from '@/components/Stats'
import Courses from '@/components/Courses'
import Method from '@/components/Method'
import Teachers from '@/components/Teachers'
import Results from '@/components/Results'
import Pricing from '@/components/Pricing'
import Faq from '@/components/Faq'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import TelegramFab from '@/components/TelegramFab'
import { STR, type Lang } from '@/lib/i18n'

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
    <>
      <Header lang={lang} setLang={setLang} labels={T} />
      <main>
        <Hero T={T} />
        <Ticker items={T.results.ticker} />
        <Stats items={T.stats} />
        <Courses T={T.courses} />
        <Method T={T.method} />
        <Teachers T={T.teachers} />
        <Results T={T.results} />
        <Pricing T={T.pricing} />
        <Faq T={T.faq} />
        <Contact T={T.contact} />
      </main>
      <Footer T={T} />
      <TelegramFab label={T.telegram} />
    </>
  )
}
