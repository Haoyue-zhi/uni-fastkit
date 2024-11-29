/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  trailingComma: 'all',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  overrides: [
    {
      files: '*.nvue',
      options: {
        parser: 'vue',
      },
    },
    {
      files: '*.json',
      options: {
        trailingComma: 'none',
      },
    },
  ],
}
