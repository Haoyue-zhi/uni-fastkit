import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        'screen-uni': 'calc(100vh - var(--window-top) - var(--window-bottom))',
      },
    },
  },
  plugins: [],
} satisfies Config
