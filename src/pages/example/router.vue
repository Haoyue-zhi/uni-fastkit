<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Router',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 uni-mini-router 文档',
    value: '路由管理',
    url: 'https://moonofweisheng.github.io/uni-mini-router/',
  },
  {
    title: '🐙 GitHub 仓库',
    value: 'uni-mini-router',
    url: 'https://github.com/Moonofweisheng/uni-mini-router',
  },
  {
    title: '🌟 uni-app 页面传参',
    value: 'props获取参数',
    url: 'https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#url-search-params',
  },
  {
    title: '📖 uni-app 路由文档',
    value: '页面路由',
    url: 'https://uniapp.dcloud.net.cn/tutorial/page.html#%E8%B7%AF%E7%94%B1',
  },
  {
    title: '📖 uni-app 拦截器文档',
    value: '拦截器',
    url: 'https://uniapp.dcloud.net.cn/api/interceptor.html#addinterceptor',
  },

]
</script>

<template>
  <LinkCellGroup :list="linkList" />
</template>
