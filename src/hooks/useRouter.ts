import { storage } from '@/utils/storage'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore
import { pages } from 'virtual:uni-pages'

const loginPath = '/pages/user/login'

type GoOptions =
  | string
  | {
    path: string
    mode?: 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'preloadPage'
    events?: {
      [key: string]: (data: any) => void
    }
    query?: {
      [key: string]: any
    }
    params?: {
      [key: string]: any
    }
    isGuard?: boolean
    [key: string]: any
  }

// 钩子函数
const fn: { [key: string]: (...args: any[]) => any } = {}

export function useRouter() {
  // 路由列表
  const routes = pages

  // 当前页
  const currentPage = () => {
    const index = getCurrentPages().length - 1
    return getCurrentPages()[index]
  }

  // 当前页信息
  const pageInfo = () => {
    const page = currentPage()

    if (!page)
      return null
    const { route, $page, $vm, $getAppWebview }: any = page

    const q: any = {}
    try {
      $page?.fullPath
        .split('?')[1]
        .split('&')
        .forEach((e: string) => {
          const [k, v] = e.split('=')
          q[k] = decodeURIComponent(v)
        })
    }
    catch (e) {
      console.error('地址栏参数解析失败', e)
    }

    // 页面配置
    const style = routes.find((e: { path: any }) => e.path === route)?.style
    return {
      $vm,
      $getAppWebview,
      path: `/${route}`,
      fullPath: $page?.fullPath,
      query: q || {},
      style,
      isCustomNavbar: style?.navigationStyle === 'custom',
    }
  }

  // 地址栏参数
  const query = pageInfo()?.query

  // 临时参数
  const params = storage.get('router-params') || {}

  // 当前页地址
  const path = `/${currentPage().route}`

  // 页面跳转
  const go = (options: GoOptions) => {
    if (typeof options == 'string') {
      options = {
        path: options,
        mode: 'navigateTo',
      }
    }

    let {
      path,
      mode = 'navigateTo',
      animationType,
      animationDuration,
      events,
      success,
      fail,
      complete,
      query,
      params,
      isGuard = true,
    } = options || {}

    if (query) {
      const arr = []

      for (const i in query) {
        if (query[i] !== undefined) {
          arr.push(`${i}=${query[i]}`)
        }
      }

      path += `?${arr.join('&')}`
    }

    if (params) {
      storage.set('router-params', params)
    }

    const data = {
      url: path,
      animationType,
      animationDuration,
      events,
      success,
      fail,
      complete,
    }

    const next = () => {
      switch (mode) {
        case 'navigateTo':
          uni.navigateTo(data)
          break

        case 'redirectTo':
          uni.redirectTo(data)
          break

        case 'reLaunch':
          uni.reLaunch(data)
          break

        case 'switchTab':
          uni.switchTab(data)
          break

        case 'preloadPage':
          uni.preloadPage(data)
          break
      }
    }

    if (fn.beforeEach && isGuard) {
      fn.beforeEach({ path: options.path, query }, next, (options: GoOptions) => {
        go(options)
      })
    }
    else {
      next()
    }
  }

  // 页面栈长度是否只有1
  const isFirstPage = () => getCurrentPages().length === 1

  // 后退
  const back = (options?: UniApp.NavigateBackOptions) => {
    if (!isFirstPage()) {
      uni.navigateBack(options || {})
    }
  }

  // 执行当前页面的某个方法
  const callMethod = (name: string, data?: any) => {
    const { $vm }: any = pageInfo()

    if ($vm) {
      if ($vm.$.exposed?.[name]) {
        return $vm.$.exposed[name](data)
      }
    }
  }

  //  回到首页
  const home = () => {
    go(`/${routes[0].path}`)
  }

  // 去登录
  const login = (options?: { reLaunch: boolean }) => {
    const { reLaunch = false } = options || {}

    go({
      path: loginPath,
      mode: reLaunch ? 'reLaunch' : 'navigateTo',
      isGuard: false,
    })
  }

  // 登录成功后操作
  const nextLogin = (type?: string) => {
    const pages = getCurrentPages()
    const index = pages.findIndex(e => loginPath.includes(e.route!))

    if (index <= 0) {
      home()
    }
    else {
      back({
        delta: pages.length - index,
      })
    }

    // 登录方式
    storage.set('loginType', type)

    // 登录回调
    if (fn.afterLogin) {
      fn.afterLogin()
    }

    // 事件
    uni.$emit('afterLogin', { type })
  }

  // 跳转前钩子
  const beforeEach = (callback: (to: any, next: () => void) => void) => {
    fn.beforeEach = callback
  }

  // 登录后回调
  const afterLogin = (callback: () => void) => {
    fn.afterLogin = callback
  }

  return {
    routes,
    currentPage,
    pageInfo,
    query,
    params,
    path,
    go,
    isFirstPage,
    back,
    callMethod,
    home,
    login,
    nextLogin,
    beforeEach,
    afterLogin,
  }
}
