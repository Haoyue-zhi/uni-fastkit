import { alova } from '@/service'
export function alovaGetDemo() {
  return alova.Get<IResponseType<any>>('/todos/1', {
    cacheFor: 0,
  })
}

// import { un } from '@/service'
// import { type UnData } from '@uni-helper/uni-network'

// export function unGetDemo() {
//   return un.get<
//     UnData, // 对应 response.data 类型
//     UnData, // 对应传参中 data 类型
//     Record<string, any> // 对应 response 类型
//   >('/demo')
// }
