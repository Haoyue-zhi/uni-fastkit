<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'UnoCSS',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 UnoCSS 文档',
    value: 'UnoCSS',
    url: 'https://unocss.dev/',
  },
  {
    title: '🐙 GitHub 仓库',
    value: 'UnoCSS',
    url: 'https://github.com/unocss/unocss',
  },
  {
    title: '📖 Tailwind CSS',
    value: '参考文档',
    url: 'https://tailwindcss.com/',
  },
]

const colorCategories = [
  {
    name: '灰色系',
    colors: [
      { name: 'gray-50', class: 'bg-gray-50', value: '#f9fafb' },
      { name: 'gray-100', class: 'bg-gray-100', value: '#f3f4f6' },
      { name: 'gray-200', class: 'bg-gray-200', value: '#e5e7eb' },
      { name: 'gray-300', class: 'bg-gray-300', value: '#d1d5db' },
      { name: 'gray-400', class: 'bg-gray-400', value: '#9ca3af' },
      { name: 'gray-500', class: 'bg-gray-500', value: '#6b7280' },
    ],
  },
  {
    name: '主题色',
    colors: [
      { name: 'blue-500', class: 'bg-blue-500', value: '#3b82f6' },
      { name: 'green-500', class: 'bg-green-500', value: '#10b981' },
      { name: 'red-500', class: 'bg-red-500', value: '#ef4444' },
      { name: 'yellow-500', class: 'bg-yellow-500', value: '#f59e0b' },
      { name: 'purple-500', class: 'bg-purple-500', value: '#8b5cf6' },
      { name: 'pink-500', class: 'bg-pink-500', value: '#ec4899' },
    ],
  },
]

const layoutExamples = [
  {
    title: 'Flex 居中',
    code: 'flex-center',
    class: 'flex-center h-20 bg-blue-100 rounded-2 text-blue-800',
  },
  {
    title: 'Grid 网格',
    code: 'grid grid-cols-3 gap-4',
    class: 'grid grid-cols-3 gap-2',
  },
]
</script>

<template>
  <demo-block title="Colors">
    <view class="border-lg">
      <view v-for="category in colorCategories" :key="category.name" class="mb-4 last:mb-0">
        <view class="mb-3 text-4 text-gray-800 font-bold dark:text-[var(--wot-dark-color)]">
          {{ category.name }}
        </view>
        <view class="grid grid-cols-3 gap-2">
          <view
            v-for="color in category.colors" :key="color.name"
            class="overflow-hidden rounded-2 bg-white shadow-sm dark:bg-[var(--wot-dark-background2)]"
          >
            <view :class="color.class" class="h-12 w-full" />
            <view class="p-2">
              <view class="text-2.5 text-gray-800 font-mono dark:text-[var(--wot-dark-color)]">
                {{ color.name }}
              </view>
              <view class="text-2 text-gray-500 dark:text-[var(--wot-dark-color2)]">
                {{ color.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </demo-block>

  <demo-block title="Flexbox & Grid">
    <view class="space-y-4">
      <view
        v-for="example in layoutExamples"
        :key="example.title"
        class="rounded-2 bg-white p-4"
      >
        <view class="mb-3 flex items-center justify-between">
          <view class="text-4 text-gray-800 font-bold">
            {{ example.title }}
          </view>
          <view class="rounded bg-gray-100 px-2 py-1 text-2.5 text-gray-700 font-mono">
            {{ example.code }}
          </view>
        </view>
        <view v-if="example.title === 'Flex 居中'" :class="example.class">
          <text class="text-3.5">
            居中内容
          </text>
        </view>
        <view v-else-if="example.title === 'Grid 网格'" :class="example.class">
          <view
            v-for="n in 6"
            :key="n"
            class="rounded bg-blue-100 p-2 text-center text-3 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
          >
            {{ n }}
          </view>
        </view>
        <view v-else :class="example.class">
          <text class="text-3.5">
            左侧
          </text>
          <text class="text-3.5">
            右侧
          </text>
        </view>
      </view>
    </view>
  </demo-block>
  <LinkCellGroup :list="linkList" />
</template>
