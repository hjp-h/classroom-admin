import { ICommonObj } from '@/global/type'

export interface ISuggestionState {
  suggestionList: ICommonObj[]
  suggestionCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  userId?: number
}
