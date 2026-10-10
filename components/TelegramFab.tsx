import { Send } from 'lucide-react'
import { SITE } from '@/lib/site'

export default function TelegramFab({ label }: { label: string }) {
  return (
    <a href={`https://t.me/${SITE.telegram}`} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
      className="fixed bottom-5 right-5 z-40 hidden lg:flex h-14 w-14 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-lift transition hover:scale-105 animate-float">
      <Send className="h-6 w-6 -translate-x-0.5 translate-y-0.5" />
    </a>
  )
}
