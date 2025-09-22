<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'

defineOptions({
  addGlobalClass: true,
  virtualHost: true,
  styleIsolation: 'shared',
})

defineProps<listItem>()

const title = import.meta.env.VITE_APP_TITLE
</script>

<template>
  <view class="relative flex-col-center gap-2 overflow-hidden rounded-lg bg-white px-5 py-8 text-center">
    <view
      v-if="icon"
      class="absolute bottom-0 left-0 right-0 top-0 w-full opacity-75 blur-[20px]"
      :style="{ backgroundImage: `radial-gradient(circle at center, ${color}66, transparent 70%)` }"
    />
    <view v-if="icon" class="size-18" :class="icon" :style="{ color }" />
    <image v-else class="size-18" src="/static/logo.png" mode="scaleToFill" />
    <text class="font- text-6 text-gray-800">
      {{ name || title }}
    </text>
    <text class="text-3.5 text-gray-600">
      {{ text || '快如其名，开箱即用。' }}
    </text>
    <text v-if="describe" class="text-3 text-gray-500">
      {{ describe }}
    </text>
  </view>
</template>
