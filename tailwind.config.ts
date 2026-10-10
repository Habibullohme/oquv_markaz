import type { Config } from 'tailwindcss'
const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Asosiy rang — kobalt ko'k
        brand: {
          50: '#eef1ff',
          100: '#dfe4ff',
          200: '#c3ccff',
          300: '#9aa8ff',
          400: '#6f7cff',
          500: '#4b55f5',
          600: '#3238e6',
          700: '#2629c4',
          800: '#20259c',
          900: '#1f257b',
          950: '#121447',
        },
        // Urg'u rangi — marker sariq
        sun: { 300: '#ffe27a', 400: '#ffd43b', 500: '#f5b800' },
        // Fon ranglari
        ink: { 900: '#0b0d1f', 950: '#06071a' },
        paper: '#f7f7fb',
      },
      fontFamily: {
        display: ['Unbounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(18,20,71,0.18)',
        lift: '0 24px 60px -20px rgba(18,20,71,0.35)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'fade-up': { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-up': 'fade-up .7s cubic-bezier(.2,.7,.2,1) both',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
