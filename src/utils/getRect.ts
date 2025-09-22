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
        if (all && Array.isArray(rect) && (rect as []).length > 0) {
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
