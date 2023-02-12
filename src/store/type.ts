import { ILoginState } from './modules/login/type'
import { ISystemState } from './modules/main/system/type'
import { INoticeState } from './modules/main/notice/type'
import { ISuggestionState } from './modules/main/suggestion/type'
import { IMaintenanceState } from './modules/main/maintenance/type'
import { IGoodsApplyState } from './modules/main/goodsApply/type'
import { ICommentState } from './modules/main/comment/type'
interface IRootState {
  name: string
  age: number
  allDepartment: any[]
  allRole: any[]
  allMenu: any[]
}
interface IRootModule {
  login: ILoginState
  system: ISystemState
  notice: INoticeState
  suggestion: ISuggestionState
  maintenance: IMaintenanceState
  goodsApply: IGoodsApplyState
  comment: ICommentState
}
type IStoreType = IRootState & IRootModule
export { IRootState, IStoreType }
