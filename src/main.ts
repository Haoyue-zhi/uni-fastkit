import { createSSRApp } from 'vue'
import { createStore, Pinia } from '@/stores'
import App from './App.vue'
import router from './router'
import './tailwind.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createStore)
  app.use(router)

  return {
    app,
    Pinia, // 针对nvue优化
  }
}
