import { useAuthStore } from '@/store'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { DefaultBaseUrl as baseURL, DefaultHeaders, timeout } from './common'
import emitter from './helper'

const alova = createAlova({
  baseURL,
  timeout,
  ...AdapterUniapp(),
  async beforeRequest(method) {
    const authStore = useAuthStore()
    const token = authStore.token
    method.config.headers = {
      Authorization: token ? `Bearer ${authStore.token}` : null,
      ...DefaultHeaders,
      ...method.config.headers,
    }
  },
  responded: {
    onSuccess: (response) => {
      const handleResponseData = (data: any) => {
        let parsedData
        try {
          parsedData = typeof data === 'string' ? JSON.parse(data) : data
        } catch {
          parsedData = data
        }
        return parsedData
      }

      if (response.statusCode >= 200 && response.statusCode < 300) {
        const hasData = 'data' in response
        return hasData ? handleResponseData(response.data) : response
      } else {
        emitter.emit('API_ERROR', '接口请求失败，请稍后再试')
        return response
      }
    },
    onError: (error) => {
      let message = error.message
      if (message === 'Network Error') {
        message = '后端网络故障'
      }
      if (message.includes('timeout')) {
        message = '接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        message = `接口${message.slice(message.length - 3)}异常`
      }

      emitter.emit('API_ERROR', message)
    },
  },
})

export { alova }
