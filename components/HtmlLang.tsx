'use client'
import { useEffect } from 'react'

// <html lang> ni sahifa tiliga moslaydi (ildiz layout bitta, standart — uz)
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return null
}
