/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--ds-canvas) / <alpha-value>)',
        surface: 'rgb(var(--ds-surface) / <alpha-value>)',
        card: 'rgb(var(--ds-card) / <alpha-value>)',
        line: 'rgb(var(--ds-line) / <alpha-value>)',
        title: 'rgb(var(--ds-title) / <alpha-value>)',
        muted: 'rgb(var(--ds-muted) / <alpha-value>)',
        accent: 'rgb(var(--ds-accent) / <alpha-value>)',
        highlight: 'rgb(var(--ds-highlight) / <alpha-value>)',
        ink: 'rgb(var(--ds-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.125rem',
        '3xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 4px 24px -8px rgba(15, 23, 42, 0.12)',
        'soft-lg': '0 16px 48px -16px rgba(15, 23, 42, 0.18)',
        glow: '0 0 80px -20px rgba(37, 99, 235, 0.35)',
      },
    },
  },
  plugins: [],
}
