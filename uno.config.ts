import { presetUni } from '@uni-helper/unocss-preset-uni'
import { defineConfig, presetAttributify, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [
    presetUni({
      attributify: false,
    }),
    presetIcons({
      scale: 1.2, // 图标大小
      warn: true, // 警告
      // 额外的 CSS 属性来控制图标的默认行为，默认内联图标
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetAttributify(),
  ],
  transformers: [
    // 启用 @apply 功能，比如：
    // .custom - div { @apply text-center my-0 font-medium } =>
    // .custom - div { margin-top: 0rem; margin-bottom: 0rem; text-align: center; font-weight: 500;}
    // 用于 @apply、@screen 和 theme()指令的 UnoCSS 转换器
    transformerDirectives(),
    // 启用 () 分组功能，比如：
    // <div class="hover:(bg-gray-400 font-medium) font-(light mono)"/> =>
    // <div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
    transformerVariantGroup(),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex justify-center items-center flex-col',
  },
  rules: [
    ['uni-h-screen', { height: 'calc(100vh - var(--window-top) - var(--window-bottom))' }],
    ['uni-min-h-screen', { 'min-height': 'calc(100vh - var(--window-top) - var(--window-bottom))' }],
    [
      'p-safe',
      {
        padding:
          'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
      },
    ],
    ['pt-safe', { 'padding-top': 'env(safe-area-inset-top)' }],
    ['pb-safe', { 'padding-bottom': 'env(safe-area-inset-bottom)' }],
  ],
})
