import process from 'node:process'
import { fileURLToPath } from 'node:url'
import uni from '@dcloudio/vite-plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import { UnifiedViteWeappTailwindcssPlugin } from 'weapp-tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // 这里必须这样引用，因为 uni 只提供了 cjs 的版本且 uni-app 默认 cjs，而 @tailwindcss/vite 只提供了 esm 版本
  const { default: tailwindcss } = await import('@tailwindcss/vite')

  const { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_PROXY, VITE_APP_PROXY_PREFIX, VITE_BASE_URL } = loadEnv(mode, process.cwd())

  const { UNI_PLATFORM } = process.env

  const PLATFORM = {
    isMp: UNI_PLATFORM?.startsWith('mp') ?? false,
    isH5: UNI_PLATFORM === 'h5',
    isApp: UNI_PLATFORM === 'app',
  }

  return {
    base: VITE_APP_BASE,
    plugins: [
      UniLayouts(),
      UniPages({
        dts: 'src/types/uni-pages.d.ts',
        subPackages: ['src/pages-sub'],
        exclude: ['**/components/**/*.*'],
        routeBlockLang: 'json5',
      }),
      UniComponents({
        resolvers: [WotResolver()],
        dts: 'src/types/components.d.ts',
      }),
      UniManifest(),
      uni(),
      tailwindcss(),
      UnifiedViteWeappTailwindcssPlugin(
        {
          rem2rpx: true,
          disabled: PLATFORM.isH5 || PLATFORM.isApp,
        },
      ),
      AutoImport({
        imports: [
          'vue',
          'pinia',
          'uni-app',
          {
            from: 'uni-mini-router',
            imports: ['useRouter', 'useRoute'],
          },
          {
            'wot-design-uni': ['useToast', 'useNotify', 'useMessage', 'useQueue'],
          },
        ],
        dts: 'src/types/auto-import.d.ts',
        dirs: ['src/hooks'], // 自动导入 hooks
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0',
      hmr: true,
      open: PLATFORM.isH5, // h5自动打开页面
      port: Number.parseInt(VITE_APP_PORT),
      // 仅 H5 端生效
      proxy: JSON.parse(VITE_APP_PROXY)
        ? {
            [VITE_APP_PROXY_PREFIX]: {
              target: VITE_BASE_URL,
              changeOrigin: true,
              rewrite: path => path.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), ''),
            },
          }
        : undefined,
    },
  }
})
