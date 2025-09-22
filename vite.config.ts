import process from 'node:process'
import { fileURLToPath } from 'node:url'
// import uni from '@dcloudio/vite-plugin-uni'
import Uni from '@uni-helper/plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import { WotResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniKuRoot from '@uni-ku/root'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_PROXY, VITE_APP_PROXY_PREFIX, VITE_BASE_URL } = loadEnv(mode, process.cwd())

  const { UNI_PLATFORM } = process.env

  const PLATFORM = {
    isH5: UNI_PLATFORM === 'h5',
    isAPP: UNI_PLATFORM === 'app',
    isMP: UNI_PLATFORM?.startsWith('mp') ?? false,
    isQUICKAPP: UNI_PLATFORM?.startsWith('QUICKAPP') ?? false,
    type: UNI_PLATFORM,
  }

  return {
    base: VITE_APP_BASE,
    plugins: [
      UniManifest(),
      UniLayouts(),
      UniComponents({
        resolvers: [WotResolver()],
        dts: 'src/types/components.d.ts',
      }),
      UniPages({
        dts: 'src/types/uni-pages.d.ts',
        subPackages: ['src/pages-sub'],
        exclude: ['**/components/**/*.*'],
        routeBlockLang: 'json5',
      }),
      UniKuRoot(),
      Uni(),
      UnoCSS(),
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
    define: {
      __UNI_PLATFORM__: PLATFORM,
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
