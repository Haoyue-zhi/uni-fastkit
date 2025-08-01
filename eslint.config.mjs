import { fileURLToPath, URL } from 'node:url'
import uniHelper from '@uni-helper/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default uniHelper(
  {
    markdown: false,
    rules: {
      'no-console': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'ts/no-empty-object-type': 'off',
    },
    ignores: [
      'uniapp-example',
      'dist',
      'src/uni_modules/',
      'src/pages.json',
      'src/manifest.json',
    ],
  },
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        config: fileURLToPath(new URL('./src/tailwind.css', import.meta.url)),
      },
    },
  },
)
