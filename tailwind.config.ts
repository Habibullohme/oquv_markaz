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
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#b9d9ff',
          300: '#8cc1ff',
          400: '#5ea6ff',
          500: '#3a88ff',
          600: '#2769db',
          700: '#1d50ab',
          800: '#183f86',
          900: '#15356f',
        },
        gold: { 400: '#f6c453' },
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,0.08)' }
    },
  },
  plugins: [],
}
export default config
