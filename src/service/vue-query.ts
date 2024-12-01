import type { Plugin } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vueQueryPluginOptions } from './index'

export const vueQueryPlugin: Plugin = {
  install: (app) => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
