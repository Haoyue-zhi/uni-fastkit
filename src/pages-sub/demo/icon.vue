<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'iconify',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 WotUI 图标',
    value: '组件库文档',
    url: 'https://wot-ui.cn/component/icon.html',
  },
  {
    title: '🌈 iconify 图标集',
    value: '超过200,000个图标',
    url: 'https://icon-sets.iconify.design/',
  },
]

const iconSizes = [
  { name: '小', value: '16px' },
  { name: '中', value: '20px' },
  { name: '大', value: '24px' },
  { name: '超大', value: '32px' },
]
const currentIconSize = ref('20px')

const wotIcons = [
  { name: 'add', desc: '添加' },
  { name: 'close', desc: '关闭' },
  { name: 'check', desc: '勾选' },
  { name: 'arrow-right', desc: '右箭头' },
  { name: 'bags', desc: '购物袋' },
  { name: 'search', desc: '搜索' },
  { name: 'star', desc: '星标' },
  { name: 'heart', desc: '喜欢' },
  { name: 'setting', desc: '设置' },
]

const iconifyIcons = [
  { name: 'i-carbon-add', desc: '添加' },
  { name: 'i-carbon-close', desc: '关闭' },
  { name: 'i-carbon-checkmark', desc: '确认' },
  { name: 'i-carbon-arrow-right', desc: '右箭头' },
  { name: 'i-carbon-home', desc: '首页' },
  { name: 'i-carbon-search', desc: '搜索' },
  { name: 'i-carbon-star', desc: '星标' },
  { name: 'i-carbon-favorite', desc: '喜欢' },
  { name: 'i-carbon-settings', desc: '设置' },
]
</script>

<template>
  <demo-block title="图标大小">
    <view class="rounded-2 bg-white p-4">
      <view class="mb-3 text-4 text-gray-800 font-bold">
        选择图标大小
      </view>
      <view class="mb-4 flex flex-wrap gap-2">
        <view
          v-for="size in iconSizes" :key="size.value" class="rounded-2 px-3 py-2 text-3 transition-all duration-200"
          :class="[
            currentIconSize === size.value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]" @click="currentIconSize = size.value"
        >
          {{ size.name }} ({{ size.value }})
        </view>
      </view>
      <view class="flex items-center justify-center rounded-2 bg-gray-50 p-4 space-x-4">
        <wd-icon name="star" :size="currentIconSize" color="#f59e0b" />
        <view class="i-carbon:star text-yellow-500" :style="{ fontSize: currentIconSize }" />
        <text class="text-3 text-gray-600">
          当前大小: {{ currentIconSize }}
        </text>
      </view>
    </view>
  </demo-block>
  <!-- WotUI 图标 -->
  <demo-block title="WotUI 内置图标（精选示例）">
    <!-- 说明文字 -->
    <view class="mb-4 border border-blue-200 rounded-2 bg-blue-50 p-3">
      <view class="mb-1 text-3.5 text-blue-700 font-bold">
        💡 说明
      </view>
      <view class="text-3 text-blue-600 leading-relaxed">
        这里只展示了部分常用图标作为示例
      </view>
    </view>

    <!-- 图标网格 -->
    <view class="grid grid-cols-3 gap-3 md:grid-cols-6 sm:grid-cols-4">
      <view
        v-for="icon in wotIcons" :key="icon.name"
        class="rounded-2 bg-white p-4 text-center transition-all duration-200 active:scale-95 hover:shadow-md"
      >
        <view class="mb-2 flex justify-center">
          <wd-icon :name="icon.name" :size="currentIconSize" color="#666" />
        </view>
        <view class="mb-1 text-2.5 text-gray-800 font-mono">
          {{ icon.name }}
        </view>
        <view class="text-2 text-gray-500">
          {{ icon.desc }}
        </view>
      </view>
    </view>

    <!-- 使用示例 -->
    <view class="mt-4 rounded-2 bg-white p-4">
      <view class="mb-3 text-4 text-gray-800 font-bold">
        使用示例
      </view>
      <view class="space-y-3">
        <view class="rounded bg-gray-100 p-3">
          <view class="mb-2 text-3 text-gray-700 font-bold">
            基础用法:
          </view>
          <view class="text-2.5 text-gray-600 leading-relaxed font-mono">
            &lt;wd-icon name="star" size="20px" color="#f59e0b" /&gt;
          </view>
        </view>
        <view class="rounded bg-gray-100 p-3">
          <view class="mb-2 text-3 text-gray-700 font-bold">
            自定义样式:
          </view>
          <view class="text-2.5 text-gray-600 leading-relaxed font-mono">
            &lt;wd-icon name="home" size="24px" color="var(--wot-color-theme)" /&gt;
          </view>
        </view>
      </view>
    </view>
  </demo-block>

  <!-- Carbon 图标 -->
  <demo-block title="Carbon 图标集">
    <view class="mb-4 border border-blue-200 rounded-2 bg-blue-50 p-3">
      <view class="mb-1 text-3.5 text-blue-700 font-bold">
        💡 说明
      </view>
      <view class="text-3 text-blue-600 leading-relaxed">
        Iconify 图标集资源异常丰富，这里我们以 Carbon 图标集为例，展示如何使用图标。
      </view>
    </view>

    <!-- 图标网格 - 静态渲染 -->
    <view class="grid grid-cols-3 gap-3 md:grid-cols-6 sm:grid-cols-4">
      <view
        v-for="icon in iconifyIcons" :key="icon.name"
        class="rounded-2 bg-white p-4 text-center transition-all duration-200 active:scale-95 hover:shadow-md"
      >
        <view class="mb-2 flex justify-center">
          <view
            :class="icon.name"
            :style="{ fontSize: currentIconSize }"
          />
        </view>
        <view class="mb-1 text-2.5 text-gray-800 font-mono">
          {{ icon.name }}
        </view>
        <view class="text-2 text-gray-500">
          {{ icon.desc }}
        </view>
      </view>
    </view>

    <!-- 使用示例 -->
    <view class="mt-4 rounded-2 bg-white p-4">
      <view class="mb-3 text-4 text-gray-800 font-bold">
        使用示例
      </view>
      <view class="space-y-3">
        <view class="rounded bg-gray-100 p-3">
          <view class="mb-2 text-3 text-gray-700 font-bold">
            UnoCSS 方式:
          </view>
          <view class="text-2.5 text-gray-600 leading-relaxed font-mono">
            &lt;div class="i-carbon-star text-xl text-yellow-500"&gt;&lt;/div&gt;
          </view>
        </view>
        <view class="rounded bg-gray-100 p-3">
          <view class="mb-2 text-3 text-gray-700 font-bold">
            自定义大小和颜色:
          </view>
          <view class="text-2.5 text-gray-600 leading-relaxed font-mono">
            &lt;div class="i-carbon-home" style="font-size: 24px; color: #3b82f6;"&gt;&lt;/div&gt;
          </view>
        </view>
      </view>
    </view>
  </demo-block>

  <!-- 对比演示 -->
  <demo-block title="图标对比">
    <view class="rounded-2 bg-white p-4">
      <view class="mb-4 text-4 text-gray-800 font-bold">
        相同功能图标对比
      </view>
      <view class="space-y-4">
        <view class="grid grid-cols-2 gap-4">
          <view class="rounded-2 bg-blue-50 p-4 text-center">
            <view class="mb-2 text-3.5 text-blue-700 font-bold">
              WotUI 图标
            </view>
            <view class="mb-3 flex justify-center space-x-4">
              <wd-icon name="home" :size="20" color="#3b82f6" />
              <wd-icon name="search1" :size="20" color="#3b82f6" />
              <wd-icon name="star" :size="20" color="#3b82f6" />
              <wd-icon name="heart" :size="20" color="#3b82f6" />
            </view>
            <view class="text-2.5 text-blue-600">
              组件化使用，API统一
            </view>
          </view>
          <view class="rounded-2 bg-green-50 p-4 text-center">
            <view class="mb-2 text-3.5 text-green-700 font-bold">
              Iconify 图标
            </view>
            <view class="mb-3 flex justify-center space-x-4">
              <view class="i-carbon:home text-20px text-green-600" />
              <view class="i-carbon:search text-20px text-green-600" />
              <view class="i-carbon:star text-20px text-green-600" />
              <view class="i-carbon:favorite text-20px text-green-600" />
            </view>
            <view class="text-2.5 text-green-600">
              原子化CSS，更加灵活
            </view>
          </view>
        </view>
      </view>
    </view>
  </demo-block>

  <!-- 使用建议 -->
  <demo-block title="使用建议">
    <view class="space-y-3">
      <view class="rounded-2 bg-white p-4">
        <view class="mb-3 flex items-center">
          <view class="mr-2 text-6">
            💡
          </view>
          <view class="text-4 text-gray-800 font-bold">
            WotUI 图标适用场景
          </view>
        </view>
        <view class="text-3 text-gray-600 leading-relaxed space-y-2">
          <view>• 与WotUI组件配合使用时</view>
          <view>• 需要统一的图标API时</view>
          <view>• 快速开发，不需要过多自定义时</view>
          <view>• 移动端应用，需要保证兼容性时</view>
        </view>
      </view>

      <view class="rounded-2 bg-white p-4">
        <view class="mb-3 flex items-center">
          <view class="mr-2 text-6">
            🎨
          </view>
          <view class="text-4 text-gray-800 font-bold">
            Iconify 图标适用场景
          </view>
        </view>
        <view class="text-3 text-gray-600 leading-relaxed space-y-2">
          <view>• 需要更多图标选择时</view>
          <view>• 使用UnoCSS原子化CSS时</view>
          <view>• 需要灵活自定义样式时</view>
          <view>• 追求更小的包体积时</view>
        </view>
      </view>

      <view class="rounded-2 bg-white p-4">
        <view class="mb-3 flex items-center">
          <view class="mr-2 text-6">
            🤝
          </view>
          <view class="text-4 text-gray-800 font-bold">
            结合使用建议
          </view>
        </view>
        <view class="text-3 text-gray-600 leading-relaxed space-y-2">
          <view>
            • <text class="text-blue-600 font-bold">
              WotUI图标
            </text>：用于组件内置图标，如按钮、表单等
          </view>
          <view>
            • <text class="text-green-600 font-bold">
              Iconify图标
            </text>：用于装饰性图标，如页面图标、状态图标等
          </view>
          <view>• 两者可以在同一个项目中混用，各取所长</view>
          <view>• 建议制定团队规范，明确使用场景</view>
        </view>
      </view>
    </view>
  </demo-block>

  <LinkCellGroup :list="linkList" />
</template>
