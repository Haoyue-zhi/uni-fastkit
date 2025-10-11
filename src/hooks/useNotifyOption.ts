import type { Route } from 'uni-mini-router'
import { setNotifyDefaultOptions } from 'wot-design-uni'

interface IRoute extends Route {
  style?: {
    navigationStyle?: string
  }
}

function calcNavSafeHeight(): number {
  const { height, top } = uni.getMenuButtonBoundingClientRect()
  const { statusBarHeight } = uni.getSystemInfoSync()

  if (!statusBarHeight) {
    return 0
  }

  const navigationBarHeight = height + (top - statusBarHeight) * 2
  return navigationBarHeight + statusBarHeight
}

export function useNotifyOption() {
  const { closeNotify } = useNotify()

  // #ifdef MP
  onShow(() => {
    const route: IRoute = useRoute()
    const isCustomNav = route?.style?.navigationStyle === 'custom'

    const safeHeight = isCustomNav ? calcNavSafeHeight() : 0
    setNotifyDefaultOptions({ safeHeight })
  })
  // #endif

  onHide(() => {
    closeNotify()
  })
}
