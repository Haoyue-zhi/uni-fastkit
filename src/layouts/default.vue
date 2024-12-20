<script setup lang="ts">
import { toastError } from '@/service/interceptorHandler'
import { addUnit, getRect } from '@/utils/tools'
import { configProviderThemeVars } from './theme'

const toast = useToast('serviceToast')

toastError(toast)

const scrollState = ref(false)

function lockScroll(val: boolean) {
  scrollState.value = val
}

const themeVars = reactive({
  ...configProviderThemeVars,
  // primaryColor: '#008000',
  // primaryColorEnd: '#008000',
})

function setTheme(val: Record<string, string>) {
  Object.assign(themeVars, val)
}

const header = ref()
const footer = ref()
const headerHeight = ref(0)
const footerHeight = ref(0)

onMounted(() => {
  if (header.value) {
    getRect('#header', false).then((res) => {
      headerHeight.value = Number(res.height)
    })
  }
  if (footer.value) {
    getRect('#footer', false).then((res) => {
      footerHeight.value = Number(res.height)
    })
  }
})

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
    <view v-if="$slots.header" id="header" ref="header" class="sticky top-[var(--window-top)] z-10">
      <slot name="header" />
    </view>
    <!-- #ifndef MP -->
    <slot :footer-height="footerHeight" :header-height="headerHeight" />
    <!-- #endif -->
    <!-- #ifdef MP -->
    <slot />
    <!-- #endif -->
    <view v-if="$slots.footer" :style="{ height: addUnit(footerHeight) }">
      <view id="footer" ref="footer" class="fixed bottom-[var(--window-bottom)] z-[1] w-full">
        <slot name="footer" />
      </view>
    </view>

    <nut-toast />
    <nut-notify />

    <nut-toast selector="serviceToast" />
  </nut-config-provider>
</template>
