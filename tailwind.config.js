/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        violet:  { DEFAULT: '#a855f7', dark: '#9333ea' },
        cyan:    { DEFAULT: '#22d3ee' },
        rose:    { DEFAULT: '#f43f5e' },
        orange:  { DEFAULT: '#fb923c' },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body:    ['var(--font-body)'],
        mono:    ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
}
