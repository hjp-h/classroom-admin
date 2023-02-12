import jpRequest from '../index'
import { IAccountLogin, IAccountLoginResult } from './type'
import { IDataType } from '@/global/type'
enum loginApi {
  accountLogin = '/login',
  loginUseInfo = '/users/', // /users/id
  userMenus = '/role/' // /role/id/menu
}
// 用户登录接口
export function accountLogin(data: IAccountLogin) {
  return jpRequest.post<IDataType<IAccountLoginResult>>({
    url: loginApi.accountLogin,
    data
  })
}
// 请求用户信息
export function getUserInfoById(id: number) {
  return jpRequest.get<IDataType>({
    url: loginApi.loginUseInfo + id,
    showLoading: false
  })
}
// 请求用户菜单
export function getUserMenuByRoleId(id: number) {
  return jpRequest.get<IDataType>({
    url: loginApi.userMenus + id + '/menu',
    showLoading: false
  })
}
