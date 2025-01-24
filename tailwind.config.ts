import type { Config } from 'tailwindcss'
import process from 'node:process'
import { addDynamicIconSelectors } from '@iconify/tailwind'

const { UNI_PLATFORM } = process.env

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      height: {
        'screen-uni': 'calc(100vh - var(--window-top) - var(--window-bottom))',
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
  corePlugins: {
    // Disable preflight for Mini Program
    preflight: !UNI_PLATFORM?.startsWith('mp'),
  },
} satisfies Config
