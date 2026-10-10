// Har bir kurs uchun chizilgan illyustratsiya. Ranglar currentColor orqali karta matni rangiga moslashadi.

// IELTS: 0–9 band shkalali spidometr, strelka 7.5 ga buriladi
function Gauge() {
  const ticks = Array.from({ length: 10 }, (_, i) => i)
  return (
    <svg viewBox="0 0 240 140" className="w-full max-w-[280px]" aria-hidden="true">
      <path d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="16" strokeLinecap="round" />
      <path className="gauge-arc" d="M20 120 A100 100 0 0 1 220 120" fill="none" stroke="#ffd43b" strokeWidth="16" strokeLinecap="round" pathLength={100} />
      {ticks.map(i => {
        const a = Math.PI - (i / 9) * Math.PI
        const x = 120 + Math.cos(a) * 76, y = 120 - Math.sin(a) * 76
        return <text key={i} x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" opacity={i >= 7 ? 1 : .5}>{i}</text>
      })}
      <g className="gauge-needle" style={{ transformOrigin: '120px 120px' }}>
        <line x1="120" y1="120" x2="120" y2="42" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="120" cy="120" r="9" fill="#ffd43b" />
    </svg>
  )
}

// CEFR: A1 → C1 zinapoyasi, B2 da bayroq
function Stairs() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-[280px]" aria-hidden="true">
      {levels.map((l, i) => {
        const h = 24 + i * 22, x = 12 + i * 45
        const on = i <= 3
        return (
          <g key={l} className="stair" style={{ ['--i' as string]: i }}>
            <rect x={x} y={140 - h} width="40" height={h} rx="6" fill={on ? '#ffd43b' : 'currentColor'} opacity={on ? 1 : .15} />
            <text x={x + 20} y={140 - h + 18} textAnchor="middle" fontSize="12" fontWeight="800" fill={on ? '#0b0d1f' : 'currentColor'} opacity={on ? 1 : .6}>{l}</text>
          </g>
        )
      })}
      <g className="flag">
        <line x1="167" y1="48" x2="167" y2="8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M167 8 L193 15 L167 23 Z" fill="#e11d48" />
      </g>
    </svg>
  )
}

// Teens: ochiq kitob va atrofida aylanadigan yulduzlar
function Book() {
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-[280px]" aria-hidden="true">
      <g className="orbit" style={{ transformOrigin: '120px 80px' }}>
        {[0, 72, 144, 216, 288].map(d => {
          const a = (d * Math.PI) / 180
          return <path key={d} transform={`translate(${120 + Math.cos(a) * 92} ${80 + Math.sin(a) * 52}) scale(.9)`} d="M0-9 2.6-2.8 9.5-2.8 4-1 6 6 0 2 -6 6-4-1-9.5-2.8-2.6-2.8Z" fill="#e11d48" />
        })}
      </g>
      <path d="M120 52 C100 40 70 38 46 44 V112 C70 106 100 108 120 120 Z" fill="currentColor" opacity=".9" />
      <path d="M120 52 C140 40 170 38 194 44 V112 C170 106 140 108 120 120 Z" fill="currentColor" opacity=".7" />
      {[60, 72, 84, 96].map(y => <line key={y} x1="60" x2="108" y1={y} y2={y + 4} stroke="#ffd43b" strokeWidth="3" strokeLinecap="round" opacity=".9" />)}
      {[60, 72, 84].map(y => <line key={y} x1="132" x2="180" y1={y + 4} y2={y} stroke="#ffd43b" strokeWidth="3" strokeLinecap="round" opacity=".9" />)}
    </svg>
  )
}

// Premium 1:1: o'qituvchi va o'quvchi doiralari, ular orasida aylanuvchi orbita
function OneOnOne() {
  return (
    <svg viewBox="0 0 240 150" className="w-full max-w-[280px]" aria-hidden="true">
      <ellipse cx="120" cy="75" rx="100" ry="46" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" strokeDasharray="6 8" className="dash-spin" />
      <line x1="78" y1="75" x2="162" y2="75" stroke="#ffd43b" strokeWidth="3" strokeDasharray="4 6" />
      <circle cx="72" cy="75" r="34" fill="currentColor" opacity=".9" />
      <circle cx="168" cy="75" r="34" fill="#ffd43b" />
      <text x="72" y="81" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0b0d1f">T</text>
      <text x="168" y="81" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0b0d1f">S</text>
    </svg>
  )
}

export default function CourseArt({ i }: { i: number }) {
  return <div className="course-art mt-6 flex items-center">{[<Gauge key="g" />, <Stairs key="s" />, <Book key="b" />, <OneOnOne key="o" />][i % 4]}</div>
}
