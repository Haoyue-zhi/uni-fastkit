export default {
  '*.{js,cjs,mjs,ts,cts,mts,vue,nvue}': 'eslint --fix',
  '*.{html,js,cjs,mjs,ts,cts,mts,vue,nvue}': 'prettier --write',
  '*.{scss,css,vue,nvue}': 'stylelint  --fix',
}
