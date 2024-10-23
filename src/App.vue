<script setup lang="ts">
import { onAlipaySandbox } from '@/utils'

const isDev = import.meta.env.MODE === 'development'

onLaunch(() => {
  console.log('App Launch')
  // #ifdef APP-PLUS
  onAlipaySandbox(isDev)
  // #endif
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@import '@/styles/tailwind.css';
@import 'nutui-uniapp/styles/index.scss';
</style>
