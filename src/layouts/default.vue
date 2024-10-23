<script setup lang="ts">
const scrollState = ref(false)

function lockScroll(val: boolean) {
  scrollState.value = val
}

const themeVars = reactive({})

function setTheme(val: any) {
  Object.assign(themeVars, val)
}

defineExpose({
  setTheme,
  lockScroll,
})
</script>

<template>
  <!-- #ifndef H5 -->
  <page-meta :page-style="`overflow:${scrollState ? 'hidden' : 'visible'};`" />
  <!-- #endif -->
  <nut-config-provider :theme-vars="themeVars">
    <slot />
  </nut-config-provider>
</template>
