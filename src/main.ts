import { IconPark } from '@icon-park/vue-next/es/all'
import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)

  app.component('IconPark', IconPark)

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
