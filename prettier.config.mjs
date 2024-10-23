/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  // 插件
  plugins: ['prettier-plugin-tailwindcss'],
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
