import { alova } from '@/service'
export function alovaGetDemo() {
  return alova.Get<IResponseType<any>>('/todos/1', {
    cacheFor: 0,
  })
}
