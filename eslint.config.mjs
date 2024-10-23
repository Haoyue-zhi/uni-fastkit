import uniHelper from '@uni-helper/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

export default uniHelper(
  {
    // uniHelper 配置规则
    uni: true,
    uniJson: true,
    vue: {
      overrides: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': [
          'error',
          {
            multiline: 1,
            singleline: 3,
          },
        ],
      },
    },
    ignores: ['src/manifest.json', 'src/pages.json'],
  },
  eslintConfigPrettier,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        whitelist: ['cus-[A-Za-z].*', 'fx-[A-Za-z].*', '.*-uni'],
      },
    },
  },
)
