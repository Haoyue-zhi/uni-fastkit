import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
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
