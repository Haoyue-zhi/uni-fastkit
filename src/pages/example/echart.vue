<script setup lang="ts">
import type { listItem } from '@/pages/code/index.vue'
import { BarChart } from 'echarts/charts'
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'

const props = defineProps<listItem>()

definePage({
  style: {
    navigationBarTitleText: 'Echart',
  },
  layout: 'example',
})

const uniLayout = ref()
usePageDescribe(uniLayout, props)

const linkList = [
  {
    title: '📚 Uni ECharts',
    value: '官方文档',
    url: 'https://uni-echarts.xiaohe.ink/',
  },
  {
    title: '📊 ECharts',
    value: 'Apache文档',
    url: 'https://echarts.apache.org/zh/index.html',
  },
]

echarts.use([
  GridComponent,
  LegendComponent,
  TooltipComponent,
  DatasetComponent,
  BarChart,
  CanvasRenderer,
])

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    data: ['销售额', '利润'],
    top: 30,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [120, 200, 150, 80, 70, 110],
      itemStyle: {
        color: '#5470c6',
      },
    },
    {
      name: '利润',
      type: 'bar',
      data: [20, 40, 30, 15, 12, 22],
      itemStyle: {
        color: '#91cc75',
      },
    },
  ],
})
</script>

<template>
  <demo-block title="柱状图">
    <view class="mb-4 rounded-lg bg-white p-4">
      <uni-echarts custom-class="h-300px" :option="option" />
    </view>
  </demo-block>
  <LinkCellGroup :list="linkList" />
</template>
