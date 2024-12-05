export function ensureDecodeURIComponent(url: string) {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}

// 解析 path
export function parseUrl(fullPath: string) {
  if (!fullPath) return {}
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query: Record<string, string> = {}

  if (queryStr) {
    queryStr.split('&').forEach((item) => {
      const [key, value] = item.split('=')
      query[key] = ensureDecodeURIComponent(value)
    })
  }

  return { name, path, query }
}

// 还原url
export function restoreUrl(path: string, query: Record<string, unknown>) {
  let count = 0
  for (const key in query) {
    path += `${count === 0 ? '?' : '&'}${key}=${query[key]}`
    count += 1
  }
  return path
}

/**
 * 开启或关闭支付宝沙箱环境
 *
 * @param on - 是否开启沙箱环境，默认为 true
 * @throws {Error} 如果 plus 未定义或出现其他异常
 */
export function onAlipaySandbox(on: boolean = true) {
  if (!on) {
    // eslint-disable-next-line no-console
    console.log(
      '%c支付宝沙箱已关闭',
      'background:#1677ff;color:#fff;padding:2px 4px;border-radius:4px;',
    )
    return
  }

  try {
    if (!plus) return
    const EnvUtils = plus.android.importClass('com.alipay.sdk.app.EnvUtils')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX)
    // eslint-disable-next-line no-console
    console.log(
      '%c支付宝沙箱已开启',
      'background:#1677ff;color:#fff;padding:2px 4px;border-radius:4px;',
    )
  } catch (e) {
    console.error('支付宝沙箱开启失败', e)
  }
}
