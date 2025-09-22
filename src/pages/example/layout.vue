<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Layout',
  },
  layout: false,
})

const linkList = [
  {
    title: '📚 uni-layouts 文档',
    value: '自定义布局',
    url: 'https://uni-helper.js.org/vite-plugin-uni-layouts#%E5%88%9B%E5%BB%BA%E5%B8%83%E5%B1%80',
  },
  {
    title: '🐙 GitHub 仓库',
    value: '自定义布局',
    url: 'https://github.com/uni-helper/vite-plugin-uni-layouts',
  },
]
</script>

<template>
  <uni-layout name="example">
    <template #header>
      <DescribeCard :icon="icon" :color="color" :name="name" :text="text" :describe="describe" />
      <view class="mt-4 h-64 flex-col-center rounded-lg bg-white">
        我是头部区域
      </view>
    </template>

    <view class="h-64 flex-col-center rounded-lg bg-white">
      我是内容区域
    </view>

    <template #footer>
      <view class="mb-4 h-64 flex-col-center rounded-lg bg-white">
        我是页脚区域
      </view>

      <LinkCellGroup :list="linkList" />
    </template>
  </uni-layout>
</template>
