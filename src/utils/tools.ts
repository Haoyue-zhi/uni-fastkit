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
  // eslint-disable-next-line no-console
  console.log(
    '%c支付宝沙箱已开启',
    'background:#1677ff;color:#fff;padding:2px 4px;border-radius:4px;',
  )
  try {
    if (!plus)
      return
    const EnvUtils = plus.android.importClass('com.alipay.sdk.app.EnvUtils')
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    EnvUtils.setEnv(EnvUtils.EnvEnum.SANDBOX)
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log('支付宝沙箱开启失败', e)
  }
}
