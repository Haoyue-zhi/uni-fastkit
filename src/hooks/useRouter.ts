/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { pages } from 'virtual:uni-pages'

export function useRouter() {
  const router = pages

  const currentpage = getCurrentPage()

  function getCurrentPage() {
    const index = getCurrentPages().length - 1
    return getCurrentPages()[index]
  }

  function pageInfo() {
    if (!currentpage) return null
    // const { route, $page, $vm, $getAppWebview }: any = currentpage
  }

  return {
    router,
    currentpage,
    pageInfo,
  }
}
