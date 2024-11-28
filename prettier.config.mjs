/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  useTabs: true,
  semi: false,
  trailingComma: "es5",
  endOfLine: "auto",
  htmlWhitespaceSensitivity: "ignore",
  overrides: [
    {
      files: "*.json",
      options: {
        trailingComma: "none",
      },
    },
  ],
};
