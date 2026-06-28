/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#080808',
        surface:   '#111111',
        border:    '#1A1A1A',
        amber:     '#10B981',
        'amber-lt':'#34D399',
        purple:    '#6366F1',
        muted:     '#4A4A4A',
        green:     '#10B981',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}