interface _IResponse<T = unknown> {
  code: number | string
  data: T
  message: string
  status?: string | number
}

export type { _IResponse as IResponse }
