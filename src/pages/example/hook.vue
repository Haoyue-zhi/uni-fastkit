<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Hook',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 VUE 官网',
    value: '组合式函数',
    url: 'https://cn.vuejs.org/guide/reusability/composables.html',
  },
  {
    title: '💡 组合式 API',
    value: '常见问答',
    url: 'https://cn.vuejs.org/guide/extras/composition-api-faq.html',
  },
]
</script>

<template>
  <LinkCellGroup :list="linkList" />
</template>
