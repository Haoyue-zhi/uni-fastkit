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
  responded: (response, method) => {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      const requestType = method.config.requestType || ''
      if (['upload', 'download'].includes(requestType)) {
        return response
      } else {
        const { data } = response as UniNamespace.RequestSuccessCallbackResult
        return data
      }
    } else {
      return response
    }
  },
})

export default alova
