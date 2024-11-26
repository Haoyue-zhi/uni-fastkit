<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
  {
    style: {
      navigationStyle: 'custom',
      navigationBarTitleText: '首页',
    },
  }
  </route>
  
  <script setup lang="ts">
  const title = ref('uni-fastkit')
  </script>
  
  <template>
    <view class="flex flex-col items-center px-4 pt-2">
      <image class="size-28" src="/static/logo.png" />
      <view class="mt-4 text-4xl">
        {{ title }}
      </view>
      <view class="mt-4">
        <nut-button type="primary">✋你好</nut-button>
      </view>
    </view>
  </template>
  
  <style lang="scss"></style>