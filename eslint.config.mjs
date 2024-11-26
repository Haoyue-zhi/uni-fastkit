import uniHelper from '@uni-helper/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
    {
        // uniHelper 配置规则
        uni: true,
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
        stylistic: [],
        ignores: ['src/manifest.json', 'src/pages.json'],
    },
    eslintConfigPrettier,
    {
        settings: {
            tailwindcss: {
                whitelist: ['cus-[A-Za-z].*', '.*-uni'],
            },
        },
    },
];