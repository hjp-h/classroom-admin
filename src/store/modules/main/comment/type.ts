import { ICommonObj } from '@/global/type'

export interface ICommentState {
  commentList: ICommonObj[]
  commentCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  userId?: number
}
