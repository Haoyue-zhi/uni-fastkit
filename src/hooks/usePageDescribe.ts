import type { listItem } from '@/pages/code/index.vue'

export function usePageDescribe(uniLayout: Ref, headerInfo?: listItem) {
  onMounted(() => {
    if (uniLayout.value && typeof uniLayout.value.setHeader === 'function') {
      uniLayout.value.setHeader(headerInfo)
    }
    else {
      console.warn('uniLayout实例不存在或没有setHeader方法')
    }
  })
}
