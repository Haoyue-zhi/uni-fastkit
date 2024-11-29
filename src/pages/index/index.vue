<route lang="json5" type="home">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <view class="flex flex-col items-center px-4 pt-2">
    <image class="size-28" src="/static/logo.png" />
    <view class="mt-4 text-4xl">
      {{ title }}
    </view>
    <view class="mt-4">
      <nut-button type="primary">✋你好</nut-button>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
