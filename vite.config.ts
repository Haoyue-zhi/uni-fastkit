import { join, resolve } from 'node:path'
import process from 'node:process'
import uni from '@dcloudio/vite-plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniTailwind from '@uni-helper/vite-plugin-uni-tailwind'
import { NutResolver } from 'nutui-uniapp'
import tailwindcss from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import ViteRestart from 'vite-plugin-restart'

const postPlugins = [tailwindcss()]

const uniPlugins = [
  UniManifest({ minify: true }),
  UniPages({
    dts: 'types/uni-pages.d.ts',
    minify: true,
    routeBlockLang: 'json5',
  }),
  UniLayouts(),
  UniComponents({
    resolvers: [NutResolver()],
    directoryAsNamespace: true,
    dts: 'types/components.d.ts',
  }),
]

const vitePlugins = [
  AutoImport({
    imports: [
      'vue',
      'pinia',
      'uni-app',
      {
        'nutui-uniapp/composables': [
          // 在这里添加需要自动导入的API
          'useToast',
        ],
      },
    ],
    dts: 'types/auto-import.d.ts',
    dirs: ['src/hooks'], // 自动导入 hooks
  }),
  ViteRestart({
    // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
    restart: [
      'vite.config.[jt]s',
      'pages.config.[jt]s',
      'manifest.config.[jt]s',
    ],
  }),
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, resolve(process.cwd(), 'env'))
  const { VITE_PORT } = env

  return {
    envDir: 'env', // 自定义env目录
    plugins: [...uniPlugins, ...vitePlugins, uni(), UniTailwind()],
    css: {
      postcss: {
        plugins: postPlugins,
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@import "nutui-uniapp/styles/variables.scss";`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: Number.parseInt(VITE_PORT),
    },
    resolve: {
      alias: {
        '@': join(process.cwd(), './src'),
      },
    },
  }
})
