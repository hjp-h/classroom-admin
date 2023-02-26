import { ICommonObj } from '@/global/type'

export interface IClassroomState {
  classroomApplyList: ICommonObj[]
  classroomApplyCount: number
  classroomQueryList: ICommonObj[]
  classroomQueryCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  id?: number
}
