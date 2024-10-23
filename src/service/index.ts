import { useAuthStore } from '@/store'
import { un as uniNetwork } from '@uni-helper/uni-network'

const baseUrl = import.meta.env.VITE_BASE_URL

const un = uniNetwork.create({
  baseUrl,
  timeout: 1000 * 10,
})

// 请求拦截器
un.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    config.headers = {
      Authorization: `Bearer ${authStore.userInfo.token}`,
    }
    // if (config.adapter === 'request') {
    //   config.headers['content-type'] = 'application/x-www-form-urlencoded';
    // }
    return config
  },
  (error) => {
    return Promise.reject(new Error(`请求失败${error}`))
  },
)

// 响应拦截器
un.interceptors.response.use(
  (response) => {
    return response.data as Record<string, any>
  },
  (error) => {
    uni.showToast({
      icon: 'none',
      title: '网络错误，换个网络试试',
    })
    return Promise.reject(error)
  },
)

export default un
