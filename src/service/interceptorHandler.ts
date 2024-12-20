import type { ToastInst } from 'nutui-uniapp'
import emitter from './helper'

export function toastError(toast?: ToastInst) {
  emitter.on('API_ERROR', (msg) => {
    if (toast) {
      toast.error(msg, {
        onClose() {
          // eslint-disable-next-line no-console
          console.log('onClose')
        },
      })
    } else {
      uni.showToast({
        title: msg,
        icon: 'none',
        success() {
          // eslint-disable-next-line no-console
          console.log('onSuccess')
        },
      })
    }
  })
}
