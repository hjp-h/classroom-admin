import { ICommonObj } from '@/global/type'

export interface IClassroomApplyState {
  classroomApplyList: ICommonObj[]
  classroomApplyCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  id?: number
}
