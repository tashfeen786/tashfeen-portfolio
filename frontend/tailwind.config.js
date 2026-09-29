/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#0a0a0f',
        surface:   '#12121a',
        'surface-2': '#1a1a28',
        border:    '#1e1e2e',
        'border-hover': '#2a2a3e',
        accent:    '#7c5cfc',
        'accent-lt':'#9b82ff',
        'accent-bg':'rgba(124,92,252,0.08)',
        'accent-border':'rgba(124,92,252,0.25)',
        muted:     '#6b6b80',
        'text-primary': '#f0f0f5',
        'text-secondary': '#a0a0b5',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}