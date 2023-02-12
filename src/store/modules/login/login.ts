// type
import { Module } from 'vuex'
import { ILoginState } from './type'
import { IRootState } from '../../type'
import { IAccountLogin } from '../../../service/login/type'
// service
import {
  accountLogin,
  getUserInfoById,
  getUserMenuByRoleId
} from '../../../service/login/login'

// utils
import { mapMenuToPermission } from '@/utils/menuMap'
import localCache from '@/utils/localCache'
import mapUserMenuToRoutes from '@/utils/menuMap'
// router
import router from '@/router'
const loginModule: Module<ILoginState, IRootState> = {
  // 使用命名空间
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: [],
      permissionList: []
    }
  },
  mutations: {
    saveToken(state, token: string) {
      state.token = token
      localCache.setItem('token', token)
    },
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo
      localCache.setItem('userInfo', userInfo)
    },
    saveUserMenu(state, userMenu) {
      state.userMenu = userMenu
      localCache.setItem('userMenu', userMenu)
      // 将菜单中的permission字段映射到一个数组中
      state.permissionList = mapMenuToPermission(userMenu)
      // 1.用户路由映射
      const routes = mapUserMenuToRoutes(userMenu)
      console.log('routes', routes)
      // 2.用户路由注册
      routes.forEach((route) => router.addRoute('Main', route))
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccountLogin) {
      // 1.登录
      const res = await accountLogin(payload)
      const { id, token } = res.data
      console.log('登录成功！', res.data)
      commit('saveToken', token)

      // 拿到token后去请求部门和角色列表的数据 比较稳妥
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('saveUserInfo', userInfo)
      // 3.请求用户菜单
      const roleId = userInfo?.role?.id
      const userMenuResult = await getUserMenuByRoleId(roleId)
      commit('saveUserMenu', userMenuResult.data)
      router.push('/main')
    }
  }
}
export default loginModule
