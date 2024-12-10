import { useAuthStore } from '@/store'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { baseUrl, commonHeaders } from './common'

const alova = createAlova({
  baseURL: baseUrl,
  timeout: 1000 * 3,
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
