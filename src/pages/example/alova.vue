<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Alova',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const { open } = useWebView()

const linkList = [
  {
    title: '📚 Alova 文档',
    value: 'alova.js',
    url: 'https://alova.js.org/zh-CN/',
  },
  {
    title: '🐙 GitHub 仓库',
    value: 'alova.js',
    url: 'https://github.com/alovajs/alova',
  },
  {
    title: '📖 uni-app 文档',
    value: '网络请求',
    url: 'https://uniapp.dcloud.net.cn/api/request/request.html',
  },
  {
    title: '🎯 Alova Hooks',
    value: '请求策略',
    url: 'https://alova.js.org/zh-CN/tutorial/client/strategy/',
  },
  {
    title: '💡 最佳实践',
    value: '使用指南',
    url: 'https://alova.js.org/zh-CN/tutorial/project/best-practice/',
  },
]
</script>

<template>
  <demo-block title="请求策略">
    <view class="mb-4 rounded-lg bg-white p-4">
      <view class="mb-3 flex items-center">
        <view
          class="flex items-center border border-slate-100 rounded-full border-solid bg-slate-200/20 px-3 text-nowrap text-xs font-bold"
        >
          分页请求
        </view>
        <view
          class="ml-2 border border-green-500 rounded-md border-solid bg-green-400/10 px-1 py-1 text-xs text-green-500 leading-none"
        >
          Client
        </view>
      </view>
      <view class="mb-3 text-3 text-gray-600 leading-relaxed">
        自动管理分页数据，数据预加载，减少不必要的数据刷新，流畅度提高300%，编码难度降低50%
      </view>

      <!-- 代码示例 -->
      <view class="mt-3 rounded-2 bg-gray-50 p-3">
        <view class="text-2.5 text-gray-600 leading-relaxed font-mono">
          <view>
            <text class="color-[#A626A4]">
              const
            </text><text class="color-[#4078f2]">
              todoList =
            </text><text class="color-[#50a14f]">
              (
            </text>page, size<text class="color-[#50a14f]">
              )
            </text>
            <text class="color-[#4078f2]">
              {{ '=>' }}
            </text> alova
            <text class="color-[#50a14f]">
              .
            </text>
            <text class="color-[#4078f2]">
              Get
            </text>
            <text class="color-[#50a14f]">
              ('/todos', {
            </text>params:<text class="color-[#50a14f]">
              {
            </text>page<text class="color-[#50a14f]">
              ,
            </text> size <text class="color-[#50a14f]">
              }
            </text><text class="color-[#50a14f]">
              });
            </text>
          </view>

          <view>
            <text class="color-[#A626A4]">
              const
            </text>
            <text class="color-[#50a14f]">
              {
            </text>
            loading<text class="color-[#50a14f]">
              ,
            </text> data<text class="color-[#50a14f]">
              ,
            </text> page<text class="color-[#50a14f]">
              ,
            </text> pageSize<text class="color-[#50a14f]">
              ,
            </text> pageCount<text class="color-[#50a14f]">
              ,
            </text> total
            <text class="color-[#50a14f]">
              }
            </text> = <text class="color-[#4078f2]">
              usePagination
            </text><text class="color-[#50a14f]">
              (
            </text>todoList<text class="color-[#50a14f]">
              );
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="mb-4 rounded-lg bg-white p-4">
      <view class="mb-3 flex items-center">
        <view
          class="flex items-center border border-slate-100 rounded-full border-solid bg-slate-200/20 px-3 text-nowrap text-xs font-bold"
        >
          监听请求
        </view>
        <view
          class="ml-2 border border-green-500 rounded-md border-solid bg-green-400/10 px-1 py-1 text-xs text-green-500 leading-none"
        >
          Client
        </view>
      </view>
      <view class="mb-3 text-3 text-gray-600 leading-relaxed">
        状态变化立即发送请求，这在tabs切换和条件查询中很有用。
      </view>

      <!-- 代码示例 -->
      <view class="mt-3 rounded-2 bg-gray-50 p-3">
        <text class="text-2.5 text-gray-600 leading-relaxed font-mono">
          <text class="color-[#4078f2]">
            useWatcher
          </text>
          <text class="color-[#50a14f]">
            (()
          </text>
          <text class="color-[#4078f2]">
            {{ '=>' }}
          </text>
          alova
          <text class="color-[#50a14f]">
            .
          </text>
          <text class="color-[#4078f2]">
            Get
          </text>
          <text class="color-[#50a14f]">
            (`/rewards/${
          </text>activeKey<text class="color-[#50a14f]">
            }`),[
          </text>
          activeKey
          <text class="color-[#50a14f]">
            ],{
          </text>
          debounce:
          <text class="color-[#50a14f]">
            [
          </text>
          <text class="text-[#b76e01]">
            500<text class="color-[#50a14f]">
              ,
            </text>0
          </text>
          <text class="color-[#50a14f]">
            ]})
          </text>
        </text>
      </view>
    </view>
    <view class="rounded-lg bg-white p-4">
      <view class="flex-center color-[#4078f2]" @click="open('https://alova.js.org/zh-CN/tutorial/client/strategy/')">
        <view>更多客户端策略</view>
        <view class="i-uil-angle-right-b" />
      </view>
    </view>
  </demo-block>
  <LinkCellGroup :list="linkList" />
</template>

<style scoped>
text {
  margin: -2px;
}
</style>
