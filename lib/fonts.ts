import localFont from 'next/font/local'

// Shriftlar o'z serverimizdan beriladi (Google Fonts'ga so'rov yo'q — telefonda tezroq ochiladi)
export const sans = localFont({
  src: [
    { path: '../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2', weight: '200 800', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
})

export const display = localFont({
  src: [
    { path: '../node_modules/@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', weight: '200 900', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})
