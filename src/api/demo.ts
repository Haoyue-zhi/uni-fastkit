import { alova, un } from '@/service'

export function unGetDemo() {
  return un.get('/demo')
}

export function alovaGetDemo() {
  return alova.Get('/todos/1', {
    cacheFor: 0,
  })
}
