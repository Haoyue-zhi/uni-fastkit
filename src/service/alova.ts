import { useAuthStore } from '@/store'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { baseUrl as baseURL, commonHeaders, timeout } from './common'

const alova = createAlova({
  baseURL,
  timeout,
  ...AdapterUniapp(),
  async beforeRequest(method) {
    const authStore = useAuthStore()
    method.config.headers = {
      ...method.config.headers,
      Authorization: `Bearer ${authStore.token}`,
      ...commonHeaders,
    }
  },
  responded: {
    async onSuccess(response: any) {
      return response
    },

    async onError(err) {
      throw err
    },
  },
})

export default alova
