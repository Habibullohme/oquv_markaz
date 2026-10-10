import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IELTS Academy LC — Get Band 7+',
  description: 'Structured IELTS & CEFR courses with Band 9 templates, weekly feedback, and bilingual teaching (English + Uzbek).',
  icons: [{ rel: 'icon', url: 'data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"><text y=\"50%\" x=\"50%\" text-anchor=\"middle\" dominant-baseline=\"middle\" font-size=\"140\">🎓</text></svg>' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
