<route lang="json5" type="page">
{
  style: {
    navigationBarTitleText: '分包页面 标题',
  },
}
</route>

<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <view class="flex h-screen-uni flex-col items-center justify-center">
    <view class="text-center">http://localhost:666/#/pages-sub/demo/index</view>
    <view class="text-center text-green-500">分包页面demo</view>
    <view class="text-center">作者：{{ name }}</view>
  </view>
</template>
