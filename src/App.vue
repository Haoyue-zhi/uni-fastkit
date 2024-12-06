<script setup lang="ts">
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
})
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show')
})
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide')
})
</script>

<style lang="scss">
/* #ifndef APP-NVUE */
@import 'nutui-uniapp/styles/index';
@import '@/styles/tailwind.css';
/* #endif */
</style>
