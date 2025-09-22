export function useWebView() {
  const router = useRouter()

  /**
   * 打开网页
   * @param url 网页地址
   */
  function open(url?: string) {
    if (!url)
      return
    // #ifdef H5
    window.open(url)
    // #endif

    // #ifndef H5
    router.push({
      path: '/pages/common/webview/index',
      query: {
        src: url,
      },
    })
    // #endif
  }

  return {
    open,
  }
}
