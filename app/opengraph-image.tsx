import { ImageResponse } from 'next/og'

// Telegram, Facebook va boshqa joylarda havola ulashilganda chiqadigan rasm
export const alt = 'IELTS Academy LC — IELTS 7.0+'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#06071a', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: '#3238e6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 800 }}>IA</div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>IELTS Academy LC</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05, display: 'flex' }}>
            IELTS <span style={{ color: '#ffd43b', marginLeft: 24 }}>7.0+</span>
          </div>
          <div style={{ fontSize: 40, color: '#c3ccff', marginTop: 16 }}>Band 9 shablonlari · Haftalik mock · Speaking klub</div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {['A2', 'B1', 'B2', 'C1'].map((l, i) => (
            <div key={l} style={{ padding: '10px 22px', borderRadius: 14, fontSize: 28, fontWeight: 800, background: i === 3 ? '#ffd43b' : 'rgba(255,255,255,0.1)', color: i === 3 ? '#0b0d1f' : '#fff' }}>{l}</div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
