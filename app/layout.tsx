import './globals.css'
import type { Metadata } from 'next'
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
