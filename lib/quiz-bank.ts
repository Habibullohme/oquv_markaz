// Daraja testi savollar bazasi: 8 bosqich (A2 → C1), har bosqichda bir nechta variant.
// Har urinishda har bosqichdan tasodifiy savol tanlanadi va javob variantlari aralashtiriladi.
// Yangi savol qo'shish: kerakli bosqich massiviga { q, o, a } qo'shing (a — to'g'ri javob indeksi).

export type Question = { q: string, o: string[], a: number, lvl: string }

export const BANK: { lvl: string, items: { q: string, o: string[], a: number }[] }[] = [
  { lvl: 'A2', items: [
    { q: 'She ___ to school every day.', o: ['go', 'goes', 'going', 'gone'], a: 1 },
    { q: 'My brother ___ coffee every morning.', o: ['drink', 'drinks', 'drinking', 'is drink'], a: 1 },
    { q: 'They ___ football on Sundays.', o: ['plays', 'play', 'playing', 'is playing'], a: 1 },
  ] },
  { lvl: 'A2', items: [
    { q: 'I have lived here ___ 2019.', o: ['for', 'since', 'from', 'at'], a: 1 },
    { q: 'We ___ to Samarkand last summer.', o: ['go', 'have gone', 'went', 'going'], a: 2 },
    { q: 'There ___ many people at the party yesterday.', o: ['was', 'were', 'is', 'are'], a: 1 },
  ] },
  { lvl: 'B1', items: [
    { q: 'If it rains tomorrow, we ___ at home.', o: ['stay', 'will stay', 'would stay', 'stayed'], a: 1 },
    { q: 'I ___ my homework when my friend called.', o: ['did', 'was doing', 'have done', 'do'], a: 1 },
    { q: 'This is the ___ film I have ever seen.', o: ['good', 'better', 'best', 'most good'], a: 2 },
  ] },
  { lvl: 'B1', items: [
    { q: 'This book ___ by millions of people.', o: ['has read', 'has been read', 'is reading', 'reads'], a: 1 },
    { q: 'You ___ wear a seatbelt. It is the law.', o: ['might', 'must', 'could', 'would'], a: 1 },
    { q: 'English ___ in many countries.', o: ['speaks', 'is spoken', 'is speaking', 'spoke'], a: 1 },
  ] },
  { lvl: 'B2', items: [
    { q: 'I wish I ___ more time to study last year.', o: ['have', 'had', 'had had', 'would have'], a: 2 },
    { q: 'If I ___ you, I would accept the offer.', o: ['am', 'be', 'were', 'will be'], a: 2 },
    { q: 'By the time we arrived, the film ___.', o: ['started', 'has started', 'had started', 'starts'], a: 2 },
  ] },
  { lvl: 'B2', items: [
    { q: 'Hardly ___ the room when the phone rang.', o: ['I had entered', 'had I entered', 'I entered', 'did I enter'], a: 1 },
    { q: 'She asked me where ___.', o: ['I lived', 'did I live', 'do I live', 'I do live'], a: 0 },
    { q: 'Not only ___ late, but he also forgot his notes.', o: ['he was', 'was he', 'he is', 'he were'], a: 1 },
  ] },
  { lvl: 'C1', items: [
    { q: 'The closest meaning of “meticulous” is…', o: ['careless', 'very careful and precise', 'extremely fast', 'generous'], a: 1 },
    { q: 'The closest meaning of “ubiquitous” is…', o: ['rare', 'found everywhere', 'very old', 'dangerous'], a: 1 },
    { q: 'The closest meaning of “mitigate” is…', o: ['make less severe', 'make worse', 'ignore', 'measure'], a: 0 },
  ] },
  { lvl: 'C1', items: [
    { q: 'The proposal was met with widespread ___.', o: ['criticism', 'critic', 'critical', 'criticise'], a: 0 },
    { q: 'The results were ___ different from what we expected.', o: ['significant', 'significantly', 'significance', 'signify'], a: 1 },
    { q: 'She has a good ___ for detail.', o: ['eye', 'look', 'view', 'sight'], a: 0 },
  ] },
]

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// Birinchi ko'rinish uchun (server bilan bir xil bo'lishi kerak) — har bosqichning birinchi savoli, aralashtirilmagan
export const firstSet = (): Question[] => BANK.map(s => ({ ...s.items[0], lvl: s.lvl }))

// Yangi to'plam: har bosqichdan tasodifiy savol, oldingi urinishdagisidan farqli; variantlar aralashtiriladi
export function randomSet(prev?: Question[]): Question[] {
  return BANK.map((s, i) => {
    const pool = s.items.filter(it => it.q !== prev?.[i]?.q)
    const it = pool[Math.floor(Math.random() * pool.length)] ?? s.items[0]
    const order = shuffle(it.o.map((_, k) => k))
    return { q: it.q, o: order.map(k => it.o[k]), a: order.indexOf(it.a), lvl: s.lvl }
  })
}
