import { ICommonObj } from '@/global/type'

export interface ISystemState {
  usersList: ICommonObj[]
  usersCount: number
  roleList: ICommonObj[]
  roleCount: number
  goodsList: ICommonObj[]
  goodsCount: number
  menuList: ICommonObj[]
  menuCount: number
  departmentList: ICommonObj[]
  departmentCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  userId?: number
}
