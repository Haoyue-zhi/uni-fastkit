/// <reference types="@uni-helper/vite-plugin-uni-pages/client" />
import { parseUrl } from '@/utils/tools'
import { pages, subPackages } from 'virtual:uni-pages'

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

export function useRouter() {
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

  return {
    router,
    currentpage,
    pageInfo,
    query,
    path,
  }
}
