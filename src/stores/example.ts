import { acceptHMRUpdate, defineStore } from 'pinia'

export const useExampleStore = defineStore('example', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function $reset() {
    count.value = 0
  }

  return { count, doubleCount, increment, decrement, $reset }
}, {
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExampleStore, import.meta.hot))
}
