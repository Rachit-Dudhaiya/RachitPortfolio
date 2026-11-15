/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F3EEE3',
          deep: '#E8E1D2',
        },
        desk: '#DCD3C2',
        ink: {
          DEFAULT: '#1B1A16',
        },
        pencil: '#6E6B61',
        rule: '#D5CDBC',
        vermillion: '#C8452D',
        blueprint: '#2B4C8C',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '1120px',
        book: '1180px',
      },
      borderRadius: {
        DEFAULT: '0px',
        input: '2px',
        pill: '999px',
      },
      boxShadow: {
        desk: '0 20px 48px -12px rgba(27, 26, 22, 0.16)',
        page: '0 4px 20px -2px rgba(27, 26, 22, 0.08)',
        gutter: 'inset 24px 0 32px -16px rgba(27, 26, 22, 0.12)',
        figure: '0 18px 40px -20px rgba(0, 0, 0, 0.22)',
      },
      transitionDuration: {
        micro: '120ms',
        standard: '240ms',
        nav: '420ms',
        entrance: '520ms',
        turn: '620ms',
        scene: '700ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
        turn: 'cubic-bezier(0.2, 0.75, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
