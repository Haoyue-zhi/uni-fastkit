import uniHelper from '@uni-helper/eslint-config'

export default uniHelper(
  {
    unocss: true,
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
)
