<script setup lang="ts">
definePage({
  // 使用 type: "home" 属性设置首页，其他页面不需要设置，默认为page
  type: 'home',
  style: {
    navigationStyle: 'custom',
  },
})

const { showNotify } = useNotify()
</script>

<template>
  <view class="flex-col-center gap-10 pt-10">
    <image
      class="size-36"
      src="/static/logo.png"
      mode="aspectFit"
    />
    <wd-button @click="showNotify({ type: 'success', message: '欢迎使用UNI-FASTKIT!' })">
      你好👋
    </wd-button>
  </view>
</template>
