import { resolve } from 'node:path'

import process from 'node:process'
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { loadEnv } from 'vite'

const env = loadEnv(process.env.NODE_ENV!, resolve(process.cwd()))

const { VITE_APP_TITLE } = env

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    // 导航栏配置
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: VITE_APP_TITLE,

    // 页面背景配置
    backgroundColor: '#f8f8f8',
    backgroundTextStyle: 'dark',
    backgroundColorTop: '#f8f8f8',
    backgroundColorBottom: '#f8f8f8',

    // 下拉刷新配置
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,

    // 动画配置
    animationType: 'pop-in',
    animationDuration: 300,
  },
  tabBar: {
    backgroundColor: '#f8f8f8',
    borderStyle: 'black',
    color: '#72757e',
    selectedColor: '#6b69ef',
    list: [
      {
        iconPath: 'static/tabbar/home-outline-rounded.png',
        selectedIconPath: 'static/tabbar/home-rounded.png',
        pagePath: 'pages/index/index',
      },
      {
        iconPath: 'static/tabbar/code-blocks-outline.png',
        selectedIconPath: 'static/tabbar/code-blocks.png',
        pagePath: 'pages/code/index',
      },
    ],
  },
  easycom: {
    custom: {
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
})
