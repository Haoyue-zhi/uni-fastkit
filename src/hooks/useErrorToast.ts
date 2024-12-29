import type { ToastInst } from 'nutui-uniapp'
import emitter from '@/service/helper'
export function useErrorToast(toast?: ToastInst) {
  let fn: (msg: string) => void
  function useToast(msg: string) {
    return (toast?: ToastInst) => {
      toast ? toast.error(msg) : uni.showToast({ title: msg, icon: 'none' })
    }
  }

  function addErrorToast(toast?: ToastInst) {
    fn = (msg: string) => useToast(msg)(toast)
    emitter.on('API_ERROR', fn)
  }

  function delErrorToast() {
    emitter.off('API_ERROR', fn)
  }

  // 所有页面使用
  onShow(() => {
    addErrorToast(toast)
  })

  // tabBar页使用
  onHide(() => {
    delErrorToast()
  })

  // 子页面使用
  onUnload(() => {
    delErrorToast()
  })
}
