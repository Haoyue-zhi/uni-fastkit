<script setup lang="ts">
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>

<style lang="scss">
@import 'nutui-uniapp/styles/index.scss';
@import '@/styles/tailwind.css';
</style>
