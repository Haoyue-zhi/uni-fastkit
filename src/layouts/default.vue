<script setup lang="ts">
const themeVars = reactive({
  // primaryColor: '#008000',
  // primaryColorEnd: '#008000',
})
</script>

<template>
  <nut-config-provider :theme-vars="themeVars">
    <slot />
    <nut-toast></nut-toast>
    <nut-notify></nut-notify>
  </nut-config-provider>
</template>
