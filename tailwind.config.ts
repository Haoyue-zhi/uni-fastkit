import type { Config } from 'tailwindcss'
import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  content: ['./index.html', './src/**/*.{vue,nvue,js,ts}'],
  theme: {
    extend: {
      height: {
        'screen-uni': 'calc(100vh - var(--window-top) - var(--window-bottom))',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
} satisfies Config
