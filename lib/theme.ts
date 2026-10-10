'use client'
import { useEffect, useState } from 'react';

// Sahifa chizilishidan oldin ishlaydi (layout.tsx) — oq/qora "miltillash" bo'lmasligi uchun
export const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export function useTheme() {
  const [dark, setDarkState] = useState(false);
  useEffect(() => {
    setDarkState(document.documentElement.classList.contains('dark'));
  }, []);
  function setDark(v: boolean) {
    setDarkState(v);
    document.documentElement.classList.toggle('dark', v);
    try { localStorage.setItem('theme', v ? 'dark' : 'light'); } catch {}
  }
  return { dark, setDark };
}
