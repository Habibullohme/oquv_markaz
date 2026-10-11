import './globals.css'
import type { Metadata, Viewport } from 'next'
import { SITE } from '@/lib/site'
import { display, sans } from '@/lib/fonts'
import Script from 'next/script'
import { themeInitScript } from '@/lib/theme'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "IELTS Academy LC — IELTS 7+ va CEFR kurslari",
  keywords: ['IELTS', 'CEFR', 'IELTS Toshkent', 'IELTS kurslari', "ingliz tili o'quv markazi", 'IELTS 7', 'mock test'],
  openGraph: { type: 'website', locale: 'uz_UZ', siteName: SITE.name, title: 'IELTS Academy LC — IELTS 7.0+', description: "Band 9 shablonlari, haftalik mock testlar va speaking klub. Bepul sinov darsiga yoziling." },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/', languages: { uz: '/', en: '/en' } },
  description: "IELTS va CEFR kurslari: Band 9 shablonlari, haftalik mock testlar va ikki tilli (o'zbek + ingliz) ta'lim.",
  icons: [{ rel: 'icon', url: 'data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"><text y=\"50%\" x=\"50%\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-size=\"140\">🎓</text></svg>' }],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7fb' },
    { media: '(prefers-color-scheme: dark)', color: '#06071a' },
  ],
}

// Google uchun tuzilgan ma'lumot (o'quv markazi haqida)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', addressCountry: 'UZ' },
  sameAs: [`https://t.me/${SITE.telegram}`, `https://instagram.com/${SITE.instagram}`],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div id="preloader" aria-hidden="true">
          <div className="font-display text-[11vw] font-extrabold leading-[0.95] tracking-tight">
            <div className="pl-word"><span>IELTS</span></div>
            <div className="pl-word"><span style={{ animationDelay: '.08s' }} className="text-sun-400">Academy</span></div>
          </div>
          <div className="mt-8 flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-white/15"><div data-pl-bar className="h-px origin-left scale-x-0 bg-sun-400" /></div>
            <div data-pl-count className="font-display text-5xl font-extrabold tabular-nums">00</div>
          </div>
        </div>
        {children}
        <Script src="/vendor/lenis.min.js" strategy="lazyOnload" />
        <Script src="/effects.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
