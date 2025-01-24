import { defineStore, acceptHMRUpdate } from 'pinia'

export const use${NAME.substring(0,1).toUpperCase()}${NAME.substring(1)}Store = defineStore('${NAME}', () => {
 
 return {}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(use${NAME.substring(0,1).toUpperCase()}${NAME.substring(1)}Store, import.meta.hot))
}
