import pkg from '@/manifest.json'
import { useAuthStore } from '@/store'
import AdapterUniapp from '@alova/adapter-uniapp'
import uniNetwork from '@uni-helper/uni-network'
import { createAlova } from 'alova'
import emitter from './helper'

const baseUrl = import.meta.env.VITE_BASE_URL
const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.versionCode}`,
}

const alovaInst = createAlova({
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

const un = uniNetwork.create({
  baseUrl,
  timeout: 1000 * 3,
  headers: commonHeaders,
})

// 请求拦截器
un.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    config.headers!.Authorization = `Bearer ${authStore.token}`
    return config
  },
  (error) => {
    return Promise.reject(new Error(`请求失败${error}`))
  },
)

// 响应拦截器
un.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return Promise.reject(new Error('响应数据为空'))
    }
    return response.data as any
  },
  (error) => {
    if (error.response.status === 401) {
      emitter.emit('API_UNAUTH')
    }
    return Promise.reject(error)
  },
)

export { alovaInst as alova, un }
