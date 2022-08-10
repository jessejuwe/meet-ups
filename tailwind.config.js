/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: { lato: ['Lato', 'sans-serif'] },
      colors: {
        test: '#77002e',
        error: 'rgb(221, 30, 30)',
        'switch-sky': 'rgb(var(--color-switch-sky) / <alpha-value>)',
        'switch-purple': 'rgb(var(--color-switch-purple) / <alpha-value>)',
        'switch-pink': 'rgb(var(--color-switch-pink) / <alpha-value>)',
        'switch-emerald': 'rgb(var(--color-switch-emerald) / <alpha-value>)',
        'switch-orange': 'rgb(var(--color-switch-orange) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },
      screens: {
        sml: '550px', // => @media (min-width: 550px) { ... }
      },
    },
  },
  plugins: [],
};
