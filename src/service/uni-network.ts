import { useAuthStore } from '@/store'
import uniNetwork from '@uni-helper/uni-network'
import { baseUrl, commonHeaders, timeout } from './common'
import emitter from './helper'

const un = uniNetwork.create({
  baseUrl,
  timeout,
  headers: commonHeaders,
})

// 请求拦截器
un.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const tonken = authStore.token
    config.headers!.Authorization = tonken ? `Bearer ${authStore.token}` : null
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
un.interceptors.response.use(
  (response) => {
    const handleResponseData = (data: any) => {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data
      return parsedData
    }

    if (response.status! >= 200 && response.status! < 300) {
      const hasData = 'data' in response
      const data = hasData ? response.data : response
      return hasData ? handleResponseData(data) : data
    } else {
      emitter.emit('API_ERROR', '接口请求失败，请稍后再试')
      return response
    }
  },
  (error) => {
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

    emitter.emit('API_ERROR', message)
    return Promise.reject(error)
  },
)

export default un
