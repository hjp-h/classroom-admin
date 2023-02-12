import { ICommonObj } from '@/global/type'

export interface INoticeState {
  noticeList: ICommonObj[]
  noticeCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  userId?: number
}
