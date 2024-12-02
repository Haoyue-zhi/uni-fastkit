<route lang="json5" type="home">
{
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts">
const title = import.meta.env.VITE_APP_TITLE

const toDemo = () => {
  uni.navigateTo({
    url: '/pages-sub/demo/index',
  })
}
</script>

<template>
  <view class="flex flex-col items-center px-4 pt-2">
    <image class="size-28" src="/static/logo.png" />
    <view class="mt-3 flex items-center">
      <view class="icon-[logos--vue] h-[71px] w-[106px]" />
      <view class="icon-[logos--tailwindcss-icon] h-[54px] w-[156px]" />
    </view>
    <view class="mt-4 text-4xl">
      {{ title }}
    </view>
    <view class="mt-4">
      <nut-button type="primary" @click="toDemo">✋你好</nut-button>
    </view>
  </view>
</template>

<style scoped lang="scss"></style>
