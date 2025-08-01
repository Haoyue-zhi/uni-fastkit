<route lang="json5" type="home">
{
  layout: false,
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<script setup lang="ts">
const msg = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <view class=" m-0 flex min-h-screen min-w-80 place-items-center">
    <view class=" mx-auto max-w-7xl p-8 text-center">
      <view>
        <image class="!size-28" src="/static/logo.png" alt="uni-fastkit logo" />
      </view>
      <HelloWorld :msg="msg" />
    </view>
  </view>
</template>
