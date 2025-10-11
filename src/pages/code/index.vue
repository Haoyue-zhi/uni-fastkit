<script setup lang="ts">
definePage({ // https://uni-helper.js.org/vite-plugin-uni-pages/definepage
  style: {
    navigationBarTitleText: '示例',
  },
  layout: 'default',
})

export interface listItem {
  icon?: string
  name?: string
  text?: string
  color?: string
  describe?: string
}

interface listItemWithUrl extends listItem {
  url: string | (() => void)
}

const router = useRouter()
const { open } = useWebView()

function goPage({ icon, name, text, color, describe, url }: listItemWithUrl) {
  if (typeof url === 'function') {
    url()
  }
  else {
    url && router.push({
      path: url,
      query: {
        icon: icon || '',
        name: name || '',
        text: text || '',
        color: color || '',
        describe: describe || '',
      },
    })
  }
}

const list: listItemWithUrl[] = [
  {
    icon: 'i-fluent-window-column-one-fourth-left-focus-left-20-filled',
    name: 'Layout',
    text: '自定义布局',
    describe: '为 Vite 下的 uni-app 提供类 nuxt 的 layouts 系统',
    color: '#845ec2',
    url: '/pages/example/layout',
  },
  {
    icon: 'i-fluent-channel-share-20-filled',
    name: 'Alova',
    text: '请求工具集',
    describe: 'alova完美兼容你最喜欢的HTTP client和UI框架，快速开发客户端和服务的应用的业务逻辑，同时让API信息与代码进行交互，像虫洞一样拉近后端协作距离，极致高效地集成你的APIs',
    color: '#d65db1',
    url: '/pages/example/alova',
  },
  {
    icon: 'i-fluent-hard-drive-20-filled',
    name: 'Pinia',
    text: '状态管理',
    describe: '类型安全、可扩展性以及模块化设计。甚至让你忘记正在使用的是一个状态库。',
    color: '#ff6f91',
    url: '/pages/example/pinia',
  },
  // {
  //   icon: 'i-tabler-fish-hook',
  //   name: 'Hook',
  //   text: '组合式函数',
  //   describe: '在 Vue 应用的概念中，“组合式函数”(Composables) 是一个利用 Vue 的组合式 API 来封装和复用有状态逻辑的函数。',
  //   color: '#ff9671',
  //   url: '/pages/example/hook',
  // },
  {
    icon: 'i-ix-piechart',
    name: 'Uni ECharts',
    text: '图表',
    describe: '适用于uni-app的ECharts组件与Vue ECharts近乎一致的使用体验!',
    color: '#ff9671',
    url: '/pages/example/echart',
  },
  {
    icon: 'i-ri-route-line',
    name: 'Router',
    text: '路由',
    describe: 'uni-mini-router是一个基于vue3和uni-app框架的轻量级路由库，它提供了类似Vue Router的API和功能，旨在帮助开发者使用类似Vue Router的方式在uni-app中进行路由跳转、传参、拦截等常用操作。',
    color: '#ffc75f',
    url: '/pages/example/router',
  },
  {
    icon: 'i-humbleicons-switch-on',
    name: 'Wot UI',
    text: '组件库',
    describe: '',
    color: '#f9f871',
    url: () => open(__UNI_PLATFORM__.isMP ? 'https://wot-ui.cn/demo/?timestamp=1756969531072#/' : 'https://wot-ui.cn/'),
  },
  {
    icon: 'i-stash-pagination-duotone',
    name: 'Z-PAGING',
    text: '分页组件',
    describe: '高性能，全平台兼容(ios、安卓、鸿蒙next、h5以及各家小程序)。支持vue、nvue、vue2、vue3，使用wxs+renderjs实现。支持虚拟列表，支持自定义下拉刷新、上拉加载更多，支持自动管理空数据图、点击返回顶部，支持聊天分页、本地分页，支持国际化等数百项配置，流畅渲染百万级列表数据。',
    color: '#fdcb6e',
    url: '/pages/example/z-paging',
  },
  {
    icon: 'i-eos-icons-atom-electron',
    name: 'UnoCSS',
    text: '原子化CSS',
    describe: '可定制 · 强大 · 快速 · 快乐',
    color: '#e17055',
    url: '/pages-sub/demo/unocss',
  },
  {
    icon: 'i-ic-outline-color-lens',
    name: 'Icon',
    text: 'WotUI 图标 和 Iconify 图标集',
    describe: '所有流行的图标集，一个框架。超过 200,000 个开源矢量图标。',
    color: '#d63031',
    url: '/pages-sub/demo/icon',
  },
]

const linkList = [
  {
    title: '📚 VUE 官网',
    url: 'https://cn.vuejs.org/',
  },
  {
    title: '📖 uni-app 官网',
    url: 'https://uniapp.dcloud.net.cn/',
  },
]
</script>

<template>
  <view class="bg-[#e8e9eb]/50 uni-min-h-screen uni-mp:pt-20">
    <view class="flex flex-col gap-4 p-4">
      <DescribeCard />
      <view class="flex flex-col overflow-hidden rounded-lg bg-white">
        <view
          v-for="(item, index) in list" :key="item.name" class="flex items-center px-3" hover-class="bg-gray-200"
          :hover-stay-time="100" @click="goPage(item)"
        >
          <view :class="item.icon" class="size-9" :style="{ color: item.color }" />
          <view
            class="ml-2 w-full flex items-center justify-between py-4"
            :class="index !== list.length - 1 ? 'border-(b-1 gray-200 b-solid)' : ''"
          >
            <view>
              {{ item.name }}·{{ item.text }}
            </view>
            <view class="i-uil-angle-right-b size-6 text-gray" />
          </view>
        </view>
      </view>
      <LinkCellGroup :list="linkList" />
    </view>
  </view>
</template>
