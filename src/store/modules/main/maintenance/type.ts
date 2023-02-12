import { ICommonObj } from '@/global/type'

export interface IMaintenanceState {
  maintenanceList: ICommonObj[]
  maintenanceCount: number
}
export interface IPayLoadtype {
  pageName: string
  query: ICommonObj
  id?: number
}
