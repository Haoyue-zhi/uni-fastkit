import { alova } from '@/service'
export function alovaGetDemo() {
  return alova.Get('/todos/1', {
    cacheFor: 0,
  })
}

// import { un } from '@/service'

// export function unGetDemo() {
//   return un.get('/demo')
// }
