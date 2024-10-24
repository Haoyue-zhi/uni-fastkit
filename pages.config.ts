import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  globalStyle: {
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'uni-fastkit',
    navigationBarBackgroundColor: '#F8F8F8',
    backgroundColor: '#F8F8F8',
    bounce: 'none',
  },
  tabBar: {
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    color: '#ffffff',
    selectedColor: '#ffffff',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home2.png',
        pagePath: 'pages/index/index',
      },
      {
        iconPath: 'static/tabbar/my.png',
        selectedIconPath: 'static/tabbar/my2.png',
        pagePath: 'pages/about/index',
      },
    ],
  },
})
