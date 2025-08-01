import { isArray } from 'radash'

/**
 * 确保给定的URL被正确地解码
 * 如果URL以'%'开头，表明它可能是一个编码过的字符串，需要进行解码处理
 * 通过递归调用自身，直到URL不再以'%'开头，确保URL被完全解码
 *
 * @param url 待解码的URL字符串
 * @returns 完全解码后的URL字符串
 */
export function ensureDecodeURIComponent(url: string) {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}

/**
 * 解析URL，返回路径和查询参数
 * @param fullPath 完整的URL路径，包含路径和查询字符串
 * @returns 返回一个对象，包含路径名称、路径和查询参数的对象
 */
export function parseUrl(fullPath: string) {
  if (!fullPath)
    return {}
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query: Record<string, string> = {}

  if (queryStr) {
    try {
      const params = new URLSearchParams(queryStr)
      params.forEach((value, key) => {
        query[key] = ensureDecodeURIComponent(value)
      })
    }
    catch {
      queryStr.split('&').forEach((item) => {
        const [key, value] = item.split('=')
        query[key] = ensureDecodeURIComponent(value)
      })
    }
  }

  return { name, path, query }
}

/**
 * 恢复URL，通过将查询参数附加到路径上
 *
 * 此函数接受一个路径和一个查询参数对象，然后将这些查询参数以键值对的形式附加到路径上
 * 它用于构建包含查询参数的完整URL
 *
 * @param path - 原始路径，不包含查询参数
 * @param query - 查询参数对象，键为参数名，值为参数值
 * @returns 返回包含查询参数的完整路径
 */
export function restoreUrl(path: string, query: Record<string, unknown>) {
  const queryString = Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return queryString ? `${path}?${queryString}` : path
}

/**
 * 开启或关闭支付宝沙箱环境
 *
 * @param on - 是否开启沙箱环境，默认为 true
 * @throws {Error} 如果 plus 未定义或出现其他异常
 */
export function onAlipaySandbox(on: boolean = true) {
  const style = 'background:#1677ff;color:#fff;padding:2px 4px;border-radius:4px;'
  const message = on ? '支付宝沙箱已开启' : '支付宝沙箱已关闭'
  console.log(`%c${message}`, style)

  if (!on)
    return

  try {
    const EnvUtils = plus.android.importClass('com.alipay.sdk.app.EnvUtils')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX)
  }
  catch (e) {
    console.error('支付宝沙箱开启失败', e)
  }
}

/**
 * @description 对num自动填充px
 * @param {number} num
 * @return {string} num+px
 */
export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? num : `${num}px`
}

export type RectResultType<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo
/**
 * 获取节点信息
 * @param selector 节点选择器 #id,.class
 * @param all 是否返回所有 selector 对应的节点
 * @param scope 作用域（支付宝小程序无效）
 * @returns 节点信息或节点信息数组
 */
export function getRect<T extends boolean>(
  selector: string,
  all: T,
  scope?: any,
): Promise<RectResultType<T>> {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    const query = scope ? uni.createSelectorQuery().in(scope) : uni.createSelectorQuery()
    query[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && isArray(rect) && (rect as []).length > 0) {
          resolve(rect as RectResultType<T>)
        }
        else if (!all && rect) {
          resolve(rect as RectResultType<T>)
        }
        else {
          reject(new Error('No nodes found'))
        }
      })
      .exec()
  })
}
