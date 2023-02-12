import { ICommonObj } from '@/global/type'

export interface IGoodsApplyState {
  goodsApplyList: ICommonObj[]
  goodsApplyCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  id?: number
}
