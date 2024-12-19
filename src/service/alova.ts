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
    const token = authStore.token
    method.config.headers = {
      ...method.config.headers,
      Authorization: token ? `Bearer ${authStore.token}` : null,
      ...commonHeaders,
    }
  },
  responded: {
    onSuccess: (response) => {
      const handleResponseData = (data: any) => {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data
        return parsedData
      }

      if (response.statusCode >= 200 && response.statusCode < 300) {
        const hasData = 'data' in response
        const data = hasData ? response.data : response
        return hasData ? handleResponseData(data) : data
      } else {
        uni.showToast({
          icon: 'none',
          title: '接口异常',
        })
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
        message = `接口${message.substr(message.length - 3)}异常`
      }
      uni.showToast({
        icon: 'none',
        title: message,
      })
    },
  },
})

export default alova
