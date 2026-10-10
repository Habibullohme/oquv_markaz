# IELTS Academy LC — Next.js App (SSR + Tailwind + Dark/Light + EN/UZ)

## Quick Start
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Build & Run (production)
```bash
npm run build
npm start
```

## What You Get
- Next.js 14 (App Router) + React 18
- TailwindCSS with dark/light mode (class strategy)
- EN/UZ bilingual content
- API route `/api/contact` to handle form submissions securely (server-side)
- Clean components: Header, Section, Container, Badge, Stat, ContactForm

## Where to Edit
- **Texts (EN/UZ)**: `lib/i18n.ts`
- **Dark/Light logic**: `lib/theme.ts`
- **Layout & Sections**: `app/page.tsx` and `components/*`
- **Form handler**: `app/api/contact/route.ts` (connect SMTP/Telegram using `.env` secrets)

## Keep Your Code Private
Deploy with a **build**:
- **Vercel** (recommended): connects repo → set env vars → deploy → server code stays private.
- **Render/Netlify**: build & run with Node. Do not upload raw source with secrets.
- Never commit your `.env` file; add it in your hosting provider’s dashboard.

## Tailwind config
- Customize brand colors in `tailwind.config.ts`.
