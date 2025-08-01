<script setup lang="ts">
import { configProviderThemeVars } from './theme'

const themeVars = reactive({
  ...configProviderThemeVars,
})

function setTheme(val: Record<string, string>) {
  Object.assign(themeVars, val)
}

defineExpose({
  setTheme,
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <slot />
    <wd-toast />
    <wd-notify />
    <wd-message-box />
  </wd-config-provider>
</template>
