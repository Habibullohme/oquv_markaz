export const STR = {
  en: {
    nav: { home: 'Home', programs: 'Programs', results: 'Results', pricing: 'Pricing', contact: 'Contact' },
    hero: {
      badge: 'IELTS Academy LC',
      title: 'Get Band 7+ with a proven system',
      subtitle: 'Structured lessons, Band 9 templates, and weekly feedback. Join hundreds of students who improved fast.',
      cta1: 'Start now',
      cta2: 'Free consultation',
    },
    trust: { a: 'Cambridge-style materials', b: 'Bilingual: English + Uzbek', c: 'Certified instructors' },
    programs: {
      title: 'Our Programs',
      subtitle: 'Choose the path that fits your goal and schedule.',
      cards: [
        { title: 'IELTS Fast-Track (7+)', desc: '8-week intensive course with Band 9 templates, weekly mock tests, and personal feedback.', points: ['Speaking/ Writing clinics', 'Cambridge past papers', 'Weekly band reports'] },
        { title: 'CEFR B1–B2 Skills', desc: 'Grammar + vocabulary with real-world speaking and writing tasks for school and work.', points: ['Bilingual explanations', 'Listening & reading drills', 'Progress quizzes'] },
        { title: 'Teens Foundation', desc: 'School-friendly program focusing on confidence, accuracy, and study habits.', points: ['Fun projects', 'Parental progress updates', 'Competitions & awards'] },
      ]
    },
    results: {
      title: 'Real Results',
      subtitle: 'Scores and success stories from our learners.',
      stats: [
        { k: 'Avg. band gain', v: '+1.0' },
        { k: 'Band 7+ achieved', v: '78%' },
        { k: 'Students taught', v: '1,200+' },
      ]
    },
    pricing: {
      title: 'Pricing',
      subtitle: 'Clear pricing. Flexible schedules.',
      plans: [
        { name: 'Starter', price: '$69/mo', note: 'Evenings 3x/week', features: ['All lessons', 'Class recordings', 'Homework feedback'] },
        { name: 'Pro (Popular)', price: '$119/mo', note: '4x/week + extras', features: ['Mock tests weekly', 'Speaking clubs', 'Printable workbooks'] },
        { name: 'Premium 1:1', price: '$19/hr', note: 'Personal coaching', features: ['Band 9 editing', 'Custom plan', 'Daily check-ins'] },
      ]
    },
    contact: {
      title: 'Contact us',
      subtitle: 'Book a free consultation or ask a question.',
      name: 'Full name',
      phone: 'Phone number',
      email: 'Email',
      message: 'Your message',
      submit: 'Send message',
      sending: 'Sending…',
      success: "Thanks! We'll contact you soon.",
      invalid: 'Please fill all fields correctly.'
    },
    footer: { rights: 'All rights reserved.', address: 'Uzbekistan · IELTS Academy LC' }
  },
  uz: {
    nav: { home: 'Bosh sahifa', programs: 'Kurslar', results: 'Natijalar', pricing: 'Narxlar', contact: 'Aloqa' },
    hero: {
      badge: 'IELTS Academy LC',
      title: "Sinovdan o'tgan tizim bilan 7+ ga erishing",
      subtitle: "Tuzilgan darslar, Band 9 shablonlari va haftalik fikr-mulohaza. Tez rivojlangan yuzlab talabalar safiga qo'shiling.",
      cta1: 'Boshlash',
      cta2: 'Bepul maslahat',
    },
    trust: { a: 'Cambridge uslubidagi materiallar', b: "Ikki tilli: Inglizcha + O'zbekcha", c: "Sertifikatlangan o'qituvchilar" },
    programs: {
      title: 'Kurslarimiz',
      subtitle: "Maqsadingiz va jadvalingizga mos yo'nalishni tanlang.",
      cards: [
        { title: 'IELTS Fast-Track (7+)', desc: '8 haftalik intensiv kurs: Band 9 shablonlari, haftalik mock testlar va shaxsiy feedback.', points: ['Speaking/Writing klinikalari', 'Cambridge topshiriqlari', 'Haftalik band hisobotlari'] },
        { title: "CEFR B1–B2 Ko'nikmalar", desc: "Grammatika + lug'at, real hayotdagi speaking va writing vazifalari bilan.", points: ['Ikki tilli tushuntirish', 'Listening & reading mashqlari', 'Progres testlari'] },
        { title: 'Teenlar uchun asos', desc: 'Maktabga mos dastur: ishonch, aniqlik va o\'qish odatlari.', points: ['Loyihalar', 'Ota-onaga hisobot', 'Tanlovlar va mukofotlar'] },
      ]
    },
    results: {
      title: 'Natijalar',
      subtitle: "O'quvchilarimizning ballari va muvaffaqiyatlari.",
      stats: [
        { k: "O'rtacha band oshishi", v: '+1.0' },
        { k: 'Band 7+ ga erishgan', v: '78%' },
        { k: 'Ta\'lim olganlar', v: '1 200+' },
      ]
    },
    pricing: {
      title: 'Narxlar',
      subtitle: 'Aniq narxlar. Moslashuvchan jadval.',
      plans: [
        { name: 'Starter', price: '$69/oy', note: 'Kechqurun 3 marta/hafta', features: ['Barcha darslar', 'Yozib olishlar', 'Uyga vazifa feedbacki'] },
        { name: 'Pro (Ommabop)', price: '$119/oy', note: "4 marta/hafta + qo'shimcha", features: ['Haftalik mock testlar', 'Speaking klublari', 'Chop etiladigan workbooklar'] },
        { name: 'Premium 1:1', price: '$19/soat', note: 'Shaxsiy coaching', features: ['Band 9 tahrir', 'Custom reja', 'Kundalik nazorat'] },
      ]
    },
    contact: {
      title: 'Aloqa',
      subtitle: 'Bepul maslahat oling yoki savolingizni yuboring.',
      name: "To'liq ism",
      phone: 'Telefon raqami',
      email: 'Email',
      message: 'Xabaringiz',
      submit: 'Xabar yuborish',
      sending: 'Yuborilmoqda…',
      success: 'Rahmat! Tez orada bog\'lanamiz.',
      invalid: 'Iltimos, maydonlarni to\'g\'ri to\'ldiring.'
    },
    footer: { rights: 'Barcha huquqlar himoyalangan.', address: "O'zbekiston · IELTS Academy LC" }
  }
} as const;

export type Lang = keyof typeof STR;
