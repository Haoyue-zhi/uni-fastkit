/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 网站标题，应用名称 */
  readonly VITE_APP_TITLE: string
  /** 服务端口号 */
  readonly VITE_SERVER_PORT: string
  /** uniapp-id */
  readonly VITE_UNI_APPID: string
  /** 微信小程序-appid */
  readonly VITE_WX_APPID: string
  /** 请求地址 */
  readonly VITE_BASE_URL: string
  /** 是否开启sourcemap */
  readonly VITE_SHOW_SOURCEMAP: string
  /** 是否清除console */
  readonly VITE_DELETE_CONSOLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
