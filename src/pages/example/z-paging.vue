<script setup lang="ts">
import type { R } from 'node_modules/vite/dist/node/types.d-aGj9QkWt'
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Z-PAGING',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 Z-PAGING 文档',
    value: '分页组件',
    url: 'https://z-paging.zxlee.cn/',
  },
  {
    title: '🐙 GitHub 仓库',
    value: 'Z-PAGING',
    url: 'https://github.com/SmileZXLee/uni-z-paging',
  },
]

const paging = ref()

const dataList = ref([])

function queryList() {
  const demoList = []
  for (let i = 0; i <= 100; i++) {
    demoList.push(i)
  }
  paging.value.setLocalPaging(demoList)
}
</script>

<template>
  <demo-block title="本地分页示例">
    <view class="h-100 rounded-lg bg-white p-4">
      <z-paging ref="paging" v-model="dataList" :fixed="false" @query="queryList">
        <view
          v-for="(item, index) in dataList" :key="item" class="border-b border-b-gray-200 border-b-solid"
          :class="index === dataList.length - 1 ? 'border-b-0' : ''"
        >
          <view class="py-4 text-center">
            {{ item }}
          </view>
        </view>
      </z-paging>
    </view>
  </demo-block>
  <LinkCellGroup :list="linkList" />
</template>
