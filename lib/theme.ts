'use client'
import { useEffect, useState } from 'react';

// Sahifa chizilishidan oldin ishlaydi (layout.tsx) — oq/qora "miltillash" bo'lmasligi uchun
export const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}try{if(sessionStorage.getItem('pl')||innerWidth<768)document.documentElement.classList.add('pl-skip')}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('fx');setTimeout(function(){if(!window.__fx)document.documentElement.classList.remove('fx')},4000)}}catch(e){}`;

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
