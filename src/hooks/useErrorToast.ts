import type { ToastInst } from 'nutui-uniapp'
import emitter from '@/service/helper'
export function useErrorToast(toast?: ToastInst) {
  let errorFn: (msg: string) => void
  function useToast(msg: string) {
    return toast ? toast.error(msg) : uni.showToast({ title: msg, icon: 'error' })
  }

  function closeToast() {
    toast ? toast.hide() : uni.hideToast()
  }

  function addErrorToast() {
    errorFn = (msg: string) => useToast(msg)
    emitter.on('API_ERROR', errorFn)
  }

  function delErrorToast() {
    emitter.off('API_ERROR', errorFn)
  }

  // 所有页面使用
  onShow(() => {
    addErrorToast()
  })

  // tabBar页使用
  onHide(() => {
    delErrorToast()
    closeToast()
  })

  // 子页面使用
  onUnload(() => {
    delErrorToast()
    closeToast()
  })
}
