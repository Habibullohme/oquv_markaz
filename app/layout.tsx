import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { themeInitScript } from '@/lib/theme'

export const metadata: Metadata = {
  title: "IELTS Academy LC — IELTS 7+ va CEFR kurslari",
  description: "IELTS va CEFR kurslari: Band 9 shablonlari, haftalik mock testlar va ikki tilli (o'zbek + ingliz) ta'lim.",
  icons: [{ rel: 'icon', url: 'data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"><text y=\"50%\" x=\"50%\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-size=\"140\">🎓</text></svg>' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Unbounded:wght@500;700;800&display=swap" />
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
        <Script src="/vendor/lenis.min.js" strategy="afterInteractive" />
        <Script src="/effects.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
