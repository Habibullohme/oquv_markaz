// Markaz haqidagi ma'lumotlar — shu yerda o'zgartiring
// Sayt manzili: hostingda NEXT_PUBLIC_SITE_URL ni o'rnating (Vercel'da avtomatik aniqlanadi)
const url = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
  || 'http://localhost:3000'

export const SITE = {
  url,
  name: 'IELTS Academy LC',
  phone: '+998 XX XXX XX XX',
  email: 'info@ieltsacademy.uz',
  telegram: 'ieltsacademy', // @ belgisisiz
  instagram: 'ieltsacademy', // @ belgisisiz
  // Xarita: openstreetmap.org da joyni toping → Share → HTML → src manzilini qo'ying
  mapSrc: 'https://www.openstreetmap.org/export/embed.html?bbox=69.20%2C41.27%2C69.32%2C41.34&layer=mapnik',
  mapLink: 'https://www.openstreetmap.org/#map=13/41.30/69.26',
}
