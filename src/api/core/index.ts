import type { IResponse } from './type'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import pkg from '@/manifest.json'
import { BUSINESS_STATUS_CODE, HTTP_STATUS_CODE_MESSAGE } from './enum'

const alovaOptions = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000 * 5,
  ...AdapterUniapp(),
  statesHook: VueHook,
}

const alovaInstance = createAlova({
  ...alovaOptions,
  beforeRequest(method) {
    method.config.headers = {
      'Accept': 'application/json,text/plain,*/*',
      'X-Version': `${encodeURIComponent(pkg.name)}/${pkg.versionCode}`,
      ...method.config.headers,
    }
    // Add content type for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method.type) && !method.config.requestType) {
      method.config.headers['Content-Type'] = 'application/json'
    }
  },
  responded: {
    onSuccess: (response, method) => {
      const { requestType } = method.config
      // 处理上传/下载请求
      if (requestType && ['upload', 'download'].includes(requestType)) {
        return response
      }

      const { statusCode, data: rawData } = response as UniNamespace.RequestSuccessCallbackResult
      // 处理 HTTP 状态码错误
      if (statusCode !== 200) {
        const errorMessage = HTTP_STATUS_CODE_MESSAGE[statusCode]
          ? `${HTTP_STATUS_CODE_MESSAGE[statusCode]}，请检查网络或联系管理员！`
          : `HTTP请求错误(${statusCode})`
        throw new Error(errorMessage)
      }

      // 处理业务逻辑错误
      const { code, message, data } = rawData as IResponse
      if (Number(code) !== BUSINESS_STATUS_CODE.Success) {
        throw new Error(`请求错误(${code}):${message}`)
      }

      // 处理成功响应，返回业务数据
      return data
    },
    onError: (err) => {
      let message = err.message
      if (message.includes('Network Error')) {
        message = '后端网络故障'
      }
      if (message.includes('timeout')) {
        message = '接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        message = `接口${message.slice(message.length - 3)}异常`
      }
      throw new Error(message)
    },
  },
})

export { alovaInstance as alova }
