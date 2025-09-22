<script lang="ts" setup>
defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
})

defineProps<{
  title: string
}>()
</script>

<template>
  <view
    class="box-border"
  >
    <view class="px-4 py-3 text-26rpx text-gray-500">
      {{ title }}
    </view>
    <view>
      <slot />
    </view>
  </view>
</template>
