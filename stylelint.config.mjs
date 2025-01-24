/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
  ],
  overrides: [
    {
      files: ['**/*.{vue,nvue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'slotted', 'global'],
      },
    ],
    'unit-no-unknown': [
      true,
      {
        ignoreUnits: ['rpx'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page', 'rich-text', 'scroll-view', '/^uni-/'],
      },
    ],
    'comment-empty-line-before': 'never',
    'custom-property-empty-line-before': 'always',
    'no-empty-source': null,
    'no-duplicate-selectors': null,
    'selector-class-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
}
