/* eslint-disable perfectionist/sort-imports */
import { join, resolve } from 'node:path'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// uni
import { NutResolver } from 'nutui-uniapp'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
// postcss
import tailwindcss from 'tailwindcss'
// other
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import ViteRestart from 'vite-plugin-restart'

const uniPlugin = [
  UniComponents({
    extensions: ['vue', 'nvue'],
    include: [/\.vue$/, /\.vue\?vue/, /\.nvue$/, /\.nvue\?nvue/],
    directoryAsNamespace: true,
    resolvers: [NutResolver()],
    dts: 'types/components.d.ts',
  }),
  UniLayouts(),
  UniPages({
    dts: 'types/uni-pages.d.ts',
    subPackages: ['src/pages-sub'],
    exclude: ['**/components/**/*.*'],
    minify: false,
    routeBlockLang: 'json5',
  }),
  UniManifest({ minify: false }),
]

const vitePlugin = [
  AutoImport({
    include: [
      /\.[tj]s?$/, // .ts, .js
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.nvue$/,
      /\.nvue\?nvue/, // .nvue
      /\.md$/, // .md
    ],
    imports: [
      'vue',
      'pinia',
      'uni-app',
      {
        'nutui-uniapp/composables': [
          // 在这里添加需要自动导入的API
          'useNotify',
          'useToast',
        ],
      },
    ],
    dts: 'types/auto-import.d.ts',
    dirs: ['src/hooks'], // 自动导入 hooks
  }),
  ViteRestart({
    // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
    restart: ['vite.config.ts'],
  }),
]

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(process.cwd(), 'env'))

  const { VITE_PORT, VITE_SHOW_SOURCEMAP, VITE_DELETE_CONSOLE } = env

  const { UNI_PLATFORM } = process.env

  const state = {
    isMp: UNI_PLATFORM?.startsWith('mp') ?? false,
    isH5: UNI_PLATFORM === 'h5',
    isApp: UNI_PLATFORM === 'app',
  }

  const plugins = [...uniPlugin, ...vitePlugin, uni()]

  if (state.isMp) {
    plugins.push(uvwt({ rem2rpx: true }))
  }

  return {
    envDir: './env', // 自定义env目录
    plugins,
    resolve: {
      alias: {
        '@': join(process.cwd(), './src'),
      },
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@import "nutui-uniapp/styles/variables.scss";`,
          silenceDeprecations: ['legacy-js-api', 'global-builtin', 'import'], // 暂时隐藏scss报错
        },
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      open: state.isH5, // h5自动打开页面
      port: Number.parseInt(VITE_PORT),
    },
    build: {
      sourcemap: state.isH5 ? VITE_SHOW_SOURCEMAP === 'true' : false, // 默认是false
      target: 'es6',
      minify: mode === 'development' ? false : 'terser',
      terserOptions: {
        compress: {
          drop_console: VITE_DELETE_CONSOLE === 'true',
          drop_debugger: true,
        },
      },
    },
  }
})
