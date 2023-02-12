export interface IDataType<T = any> {
  code: number
  data: T
  message: string
}
export interface ICommonObj {
  [key: string]: any
}
