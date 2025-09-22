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
