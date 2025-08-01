<script setup lang="ts">
defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <h1 class="text-5xl leading-[1.5] font-bold">
    {{ msg }}
  </h1>

  <view class=" p-8">
    <wd-button @click="() => count++">
      count is {{ count }}
    </wd-button>
    <view>
      Edit
      <text>components/HelloWorld.vue</text> to test HMR
    </view>
  </view>
</template>
