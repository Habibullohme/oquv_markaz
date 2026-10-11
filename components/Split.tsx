// Matnni harflarga bo'lib, scroll qilganda harfma-harf chiqaradi
export default function Split({ text }: { text: string }) {
  let c = 0
  return (
    <span className="split">
      <span className="sr-only">{text}</span>
      {text.split(' ').map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="sw">{Array.from(w).map((ch, j) => <span key={j} className="ch" style={{ ['--c' as string]: c++ }}>{ch}</span>)}</span>
          {' '}
        </span>
      ))}
    </span>
  )
}
