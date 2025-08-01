import { alova } from './core'

export interface ToDo {
  id: number
  name: string
}
export function toDo() {
  return alova.Get<ToDo>('/todos/1')
}
