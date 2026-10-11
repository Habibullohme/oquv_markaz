// Butun sahifa (server komponent). Matnlar serverda tayyorlanadi; faqat interaktiv qismlar brauzerda jonlanadi.
import Header from './Header'
import Hero from './Hero'
import Ticker from './Ticker'
import Stats from './Stats'
import Features from './Features'
import BigText from './BigText'
import Courses from './Courses'
import Method from './Method'
import Quiz from './Quiz'
import Teachers from './Teachers'
import Results from './Results'
import Pricing from './Pricing'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'
import TelegramFab from './TelegramFab'
import MobileBar from './MobileBar'
import ToTop from './ToTop'
import EnrollSheet from './EnrollSheet'
import HtmlLang from './HtmlLang'
import { STR, type Lang } from '@/lib/i18n'

export default function Site({ lang }: { lang: Lang }) {
  const T = STR[lang]
  return (
    <>
      <HtmlLang lang={lang} />
      <Header lang={lang} labels={{ nav: T.nav, menu: T.menu, call: T.call, hero: { cta1: T.hero.cta1 } }} />
      <main>
        <Hero T={T} />
        <Ticker items={T.results.ticker} />
        <Stats items={T.stats} />
        <Features T={T.features} />
        <BigText />
        <Courses T={T.courses} />
        <Method T={T.method} />
        <Quiz T={T.quiz} courses={T.courses.items} />
        <Teachers T={T.teachers} />
        <Results T={T.results} />
        <Pricing T={T.pricing} />
        <Faq T={T.faq} />
        <Contact T={T.contact} />
      </main>
      <Footer T={T} />
      <TelegramFab label={T.telegram} />
      <MobileBar T={{ call: T.call, mobileCta: T.mobileCta, telegram: T.telegram }} />
      <ToTop label={T.toTop} />
      <EnrollSheet T={{ enroll: T.enroll, contact: T.contact, call: T.call }} />
    </>
  )
}
