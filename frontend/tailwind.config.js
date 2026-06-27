/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#0C0F1A',
        surface:  '#141824',
        border:   '#1E2535',
        amber:    '#F59E0B',
        'amber-lt':'#FBBF24',
        purple:   '#7C3AED',
        muted:    '#94A3B8',
        green:    '#22C55E',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}