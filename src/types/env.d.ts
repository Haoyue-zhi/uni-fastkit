/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_UNI_APPID: string
  readonly VITE_WX_APPID: string
  readonly VITE_APP_PORT: string
  readonly VITE_APP_BASE: string
  readonly VITE_APP_PROXY: 'true' | 'false'
  readonly VITE_APP_PROXY_PREFIX: string
  readonly VITE_BASE_URL: string
  // 更多环境变量...
}
