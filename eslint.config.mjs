import uniHelper from '@uni-helper/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

export default uniHelper(
  {
    uni: true,
    uniJson: true,
    vue: true,
    jsx: false,
    stylistic: false,
    typescript: {
      parserOptions: {
        extraFileExtensions: ['.vue', '.nvue'],
      },
    },
    ignores: ['**/*.d.ts', 'src/uni_modules/', 'src/nativeplugins/', '.husky', '.vscode', '.idea'],
  },
  eslintConfigPrettier,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        whitelist: ['cus-[A-Za-z].*', '.*-uni'],
      },
    },
  },
  {
    files: ['**/*.nvue'],
    rules: {
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-negative-arbitrary-values': 'off',
      'tailwindcss/enforces-shorthand': 'off',
      'tailwindcss/migration-from-tailwind-2': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/no-contradicting-classname': 'off',
      'tailwindcss/no-unnecessary-arbitrary-value': 'off',
    },
  },
).overrides({
  'antfu/typescript/parser': { files: ['**/*.nvue'] },
  'antfu/typescript/rules': { files: ['**/*.nvue'] },
  'antfu/vue/rules': { files: ['**/*.nvue'] },
  'uni-helper/vue/rules': { files: ['**/*.nvue'] },
})
