<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'
import { useExampleStore } from '@/stores/example'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Pinia',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 Pinia 文档',
    value: '状态管理库',
    url: 'https://pinia.vuejs.org/zh/',
  },
  {
    title: '🐙 GitHub 仓库',
    value: '状态管理库',
    url: 'https://github.com/vuejs/pinia',
  },
  {
    title: '🔧 uni-app 存储',
    value: '本地存储 API',
    url: 'https://uniapp.dcloud.net.cn/api/storage/storage.html',
  },
  {
    title: '💡 Pinia 插件',
    value: 'Persistedstate',
    url: 'https://prazdevs.github.io/pinia-plugin-persistedstate/zh/',
  },
]

const exampleStore = useExampleStore()
</script>

<template>
  <demo-block title="基础使用 - 计数器">
    <view class="mb-4 rounded-lg bg-white p-4">
      <view class="mb-4 text-center">
        <view class="mb-2 text-8 text-blue-500">
          {{ exampleStore.count }}
        </view>
        <view class="text-3 text-gray-600 dark:text-[var(--wot-dark-color2)]">
          双倍值: {{ exampleStore.doubleCount }}
        </view>
      </view>

      <view class="grid grid-cols-3 mb-4 gap-2">
        <wd-button type="success" size="small" @click="exampleStore.increment">
          +1
        </wd-button>
        <wd-button type="warning" size="small" @click="exampleStore.decrement">
          -1
        </wd-button>
        <wd-button type="info" size="small" @click="exampleStore.$reset">
          重置
        </wd-button>
      </view>
    </view>
  </demo-block>
  <LinkCellGroup :list="linkList" />
</template>
