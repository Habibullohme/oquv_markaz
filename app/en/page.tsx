import type { Metadata } from 'next'
import Site from '@/components/Site'

export const metadata: Metadata = {
  title: 'IELTS Academy LC — IELTS 7+ and CEFR courses',
  description: 'IELTS and CEFR courses with Band 9 templates, weekly mock tests and bilingual teaching (English + Uzbek).',
  alternates: { canonical: '/en', languages: { uz: '/', en: '/en' } },
  openGraph: { locale: 'en_US', title: 'IELTS Academy LC — IELTS 7.0+', description: 'Band 9 templates, weekly mock tests and a speaking club. Book a free trial lesson.' },
}

export default function Page() {
  return <Site lang="en" />
}
