<script setup lang="ts">
import { toastError } from '@/service/interceptorHandler'
import { configProviderThemeVars } from './theme'

const toast = useToast('serviceToast')

toastError(toast)
// #ifdef APP
const scrollState = ref(false)

function lockScroll(val: boolean) {
  scrollState.value = val
}
// #endif

const themeVars = reactive({
  ...configProviderThemeVars,
  // primaryColor: '#008000',
  // primaryColorEnd: '#008000',
})

function setTheme(val: Record<string, string>) {
  Object.assign(themeVars, val)
}

defineExpose({
  setTheme,
  // #ifdef APP
  lockScroll,
  // #endif
})
</script>

<template>
  <!-- #ifdef APP -->
  <page-meta :page-style="`overflow:${scrollState ? 'hidden' : 'visible'};`" />
  <!-- #endif -->
  <nut-config-provider :theme-vars="themeVars">
    <slot name="header" />
    <slot />
    <slot name="footer" />

    <nut-toast />
    <nut-notify />

    <nut-toast selector="serviceToast" />
  </nut-config-provider>
</template>
