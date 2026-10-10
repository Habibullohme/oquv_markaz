# IELTS Academy LC — o'quv markaz sayti

Next.js 14 + Tailwind. O'zbek/ingliz tillari, kunduzgi/tungi rejim, arizalar Telegram'ga keladi.

## Ishga tushirish
```bash
npm install
cp .env.example .env.local   # Telegram token va chat ID ni yozing
npm run dev                  # http://localhost:3000
```

## Arizalarni Telegram'ga ulash
1. Telegram'da **@BotFather** → `/newbot` → bot yarating, **token**ni oling.
2. Botingizga `/start` yozing (yoki botni guruhga qo'shib, guruhga xabar yozing).
3. Brauzerda `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching, `"chat":{"id": ...}` raqamini oling (guruh ID'si minus bilan boshlanadi).
4. `.env.local` (yoki hosting sozlamalari) ga yozing:
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```

## Qayerni o'zgartirish kerak
- **Telefon, email, Telegram, xarita**: `lib/site.ts`
- **Matnlar (UZ/EN), narxlar, kurslar**: `lib/i18n.ts`
- **Bo'limlar va ko'rinish**: `app/page.tsx`, `components/*`
- **Ranglar**: `tailwind.config.ts`
- **Ariza qabul qiluvchi**: `app/api/contact/route.ts`

## Internetga chiqarish (Vercel)
1. vercel.com → GitHub bilan kiring → **Add New Project** → `oquv_markaz` ni tanlang.
2. **Environment Variables** ga `TELEGRAM_BOT_TOKEN` va `TELEGRAM_CHAT_ID` ni qo'shing.
3. **Deploy**. `.env` fayllar GitHub'ga yuklanmaydi (`.gitignore`).

## Namuna ma'lumotlar
`lib/i18n.ts` dagi **NAMUNA** deb belgilangan joylar (statistika raqamlari, o'qituvchilar, o'quvchilar natijalari va fikrlari) — haqiqiy ma'lumotlaringiz bilan almashtiring.
