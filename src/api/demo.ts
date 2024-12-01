import { un } from '@/service'

export function getDemo() {
  return un.get('/demo')
}
