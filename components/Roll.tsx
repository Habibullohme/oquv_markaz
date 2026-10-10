// Sichqoncha olib borilganda yozuv yuqoriga aylanib, nusxasi pastdan chiqadi
export default function Roll({ text }: { text: string }) {
  return <span className="roll"><span data-text={text}>{text}</span></span>
}
