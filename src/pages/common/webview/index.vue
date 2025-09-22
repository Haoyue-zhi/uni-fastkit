<script setup lang="ts">
defineProps<{
  src: string
}>()

uni.showLoading({
  title: '加载中',
})

function handleLoad() {
  uni.hideLoading()
}

function handleError() {
  uni.hideLoading()
}

onUnmounted(() => {
  uni.hideLoading()
})
</script>

<template>
  <web-view :src="src" allow="'src'" @load="handleLoad" @error="handleError" />
</template>
