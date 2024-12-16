// #ifdef H5
import { IconPark } from '@icon-park/vue-next/es/all'
// #endif
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  // #ifdef H5
  app.component('IconPark', IconPark)
  // #endif
  app.use(
    Pinia.createPinia().use(
      createPersistedState({
        storage: {
          getItem: uni.getStorageSync,
          setItem: uni.setStorageSync,
        },
      }),
    ),
  )

  return {
    app,
    Pinia,
  }
}
