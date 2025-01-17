import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')

  function setToken(newToken: string) {
    token.value = newToken
  }

  return {
    token,
    setToken,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
