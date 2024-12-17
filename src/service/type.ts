interface _IResponseType<T = unknown> {
  data: T
  code: number
  msg: string
}

export type { _IResponseType as IResponseType }

declare global {
  type IResponseType<T = unknown> = _IResponseType<T>
}
