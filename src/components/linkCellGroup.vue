<script setup lang="ts">
defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
})

defineProps<linkCellGroupProps>()

interface linkCellGroupProps {
  list: {
    title: string
    value?: string
    url: string
  }[]
}

const { open } = useWebView()
</script>

<template>
  <view class="box-border">
    <view class="px-4 py-3 text-26rpx text-gray-500">
      相关链接
    </view>
    <wd-cell-group border custom-class="rounded-2! overflow-hidden">
      <wd-cell v-for="item in list" :key="item.title" :title="item.title" :value="item.value" is-link @click="open(item.url)" />
    </wd-cell-group>
  </view>
</template>
