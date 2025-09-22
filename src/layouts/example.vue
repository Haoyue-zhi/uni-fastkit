<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

const info = ref<listItem>({
  icon: '',
  color: '',
  name: '',
  text: '',
  describe: '',
})

function setHeader(options: listItem) {
  info.value = options
}

defineExpose({
  setHeader,
})
</script>

<template>
  <view class="bg-[#e8e9eb]/50 uni-min-h-screen">
    <view class="flex flex-col gap-4 p-4">
      <view>
        <slot name="header">
          <DescribeCard
            :icon="info.icon" :color="info.color" :name="info.name" :text="info.text"
            :describe="info.describe"
          />
        </slot>
      </view>
      <slot />
      <view>
        <slot name="footer">
          <wd-divider>作者: 凪</wd-divider>
        </slot>
      </view>
    </view>
  </view>
</template>
