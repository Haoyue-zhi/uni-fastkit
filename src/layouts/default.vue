<script setup lang="ts">
import emitter from '@/service/helper'

const toast = useToast('serviceToast')

emitter.on('API_ERROR', (val) => {
  toast.error(val)
})

const scrollState = ref(false)

function lockScroll(val: boolean) {
  scrollState.value = val
}

const themeVars = reactive({
  // primaryColor: '#008000',
  // primaryColorEnd: '#008000',
})

function setTheme(val: Record<string, string>) {
  Object.assign(themeVars, val)
}

defineExpose({
  setTheme,
  lockScroll,
})
</script>

<template>
  <!-- #ifdef APP -->
  <page-meta :page-style="`overflow:${scrollState ? 'hidden' : 'visible'};`" />
  <!-- #endif -->
  <nut-config-provider :theme-vars="themeVars">
    <slot />
    <nut-toast />
    <nut-notify />

    <nut-toast selector="serviceToast" />
  </nut-config-provider>
</template>
