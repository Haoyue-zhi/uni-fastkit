import * as Pinia from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const createStore = Pinia.createPinia()
createStore.use(createPersistedState({
  storage: {
    getItem: uni.getStorageSync,
    setItem: uni.setStorageSync,
  },
}))

export {
  createStore,
  Pinia,
}

export * from './auth'
