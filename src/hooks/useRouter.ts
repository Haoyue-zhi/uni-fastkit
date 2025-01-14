/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { storage } from '@/utils/storage'
import { parseUrl, restoreUrl } from '@/utils/tools'
import { pages, subPackages } from 'virtual:uni-pages'

export type GoOptions =
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

const routes = getRouter()
function getRouter() {
  const arr: Record<string, unknown>[] = []

  pages.reduce((acc, item) => {
    acc.push(item)
    return acc
  }, arr)

  if (subPackages.length) {
    subPackages.reduce((acc, item) => {
      const { root, pages } = item
      pages.forEach((page: Record<string, unknown>) => {
        page.path = `${root}/${page.path}`
        acc.push(page)
      })
      return acc
    }, arr)
  }

  return arr
}

export function useRouter(loginPath?: string) {
  const router = routes

  const currentpage = getCurrentPage()

  function getCurrentPage() {
    const index = getCurrentPages().length - 1
    return getCurrentPages()[index]
  }

  function pageInfo() {
    if (!currentpage) return null
    const { route, $page, $vm, $getAppWebview }: any = currentpage
    const fullPath = $page?.fullPath
    const { name, path, query } = parseUrl(fullPath)
    const style: Record<string, any> = router.find(({ path }) => path === route)?.style ?? {}

    return {
      name,
      path,
      fullPath,
      query,
      style,
      isCustomNavbar: style?.navigationStyle === 'custom',
      $page,
      $vm,
      $getAppWebview,
    }
  }

  const query = pageInfo()?.query

  const path = pageInfo()?.path

  // 页面跳转
  const push = (options: GoOptions) => {
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
    } = options || {}

    if (query) {
      path = restoreUrl(path, query)
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

        default:
          console.error('Unknown navigation mode:', mode)
          break
      }
    }
    next()

    // if (fn.beforeEach && isGuard) {
    //   fn.beforeEach({ path, query }, next, (options: GoOptions) => go(options))
    // } else {
    //   next()
    // }
  }

  const back = (options = {}) => {
    uni.navigateBack(options)
  }

  // 执行当前页面的某个方法
  const callMethod = (name: string, data?: unknown) => {
    const { $vm }: any = pageInfo()

    if ($vm) {
      if ($vm.$.exposed?.[name]) {
        return $vm.$.exposed[name](data)
      }
    }
  }

  // 去登录
  const login = (options?: { reLaunch: boolean }) => {
    const { reLaunch = false } = options || {}
    if (!loginPath) {
      console.warn('Login path is not defined')
      return
    }
    push({
      path: loginPath,
      mode: reLaunch ? 'reLaunch' : 'navigateTo',
      isGuard: false,
    })
  }

  return {
    router,
    currentpage,
    pageInfo,
    query,
    path,
    push,
    back,
    callMethod,
    login,
  }
}
