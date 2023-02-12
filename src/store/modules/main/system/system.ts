// 类型相关
import { IRootState } from '@/store/type'
import { Module } from 'vuex'
import { ISystemState, IPayLoadtype } from './type'
// 请求相关
import {
  getPageList,
  delPageList,
  addPageList,
  editPageList
} from '@/service/main/system/system'
// 工具类
import { showMessage } from '@/utils/message'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    // 保存用户列表的数据
    saveUsersData(state, payLoad) {
      const { list, totalCount } = payLoad
      state.usersList = list
      state.usersCount = totalCount
    },
    // 保存角色的数据
    saveRoleData(state, payLoad) {
      const { list, totalCount } = payLoad
      state.roleList = list
      state.roleCount = totalCount
    },
    // 保存商品列表信息
    saveGoodsData(state, payLoad) {
      const { list, totalCount } = payLoad
      state.goodsList = list
      state.goodsCount = totalCount
    },
    // 保存菜单数据
    saveMenuData(state, payLoad) {
      const { list, totalCount } = payLoad
      state.menuList = list
      state.menuCount = totalCount
    },
    // 保存部门列表的数据
    saveDepartmentData(state, payLoad) {
      const { list, totalCount } = payLoad
      state.departmentList = list
      state.departmentCount = totalCount
    }
  },
  actions: {
    // 请求页面列表的数据
    async getDataListAction({ commit }, payLoad: IPayLoadtype) {
      // 根据页面的名字来找到对应的url
      const pageName = payLoad.pageName
      // 因为接口名字比较规范 直接拼接即可 如果实际中不规范 可采用switch case 或者map
      const requestUrl = `/${pageName}/list`
      // 请求数据
      const dataistResult = await getPageList(requestUrl, payLoad.query)
      const { list, totalCount } = dataistResult.data
      // commit数据 保存到vuex中
      const moduleName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`save${moduleName}Data`, { list, totalCount })
    },
    // 删除页面列表的数据
    async delDataListAction({ dispatch }, payLoad: IPayLoadtype) {
      // {pageName,query}
      const { pageName, query } = payLoad
      const requestUrl = `${pageName}/${query.id}`
      const result = await delPageList(requestUrl, query)
      const callback = () => {
        const params = {
          pageName,
          query: {
            offset: 0,
            size: 10
          }
        }
        dispatch('getDataListAction', params)
      }
      // 显示数据及回调
      showMessage(result, callback)
    },
    // 添加页面列表的数据
    async addDataListAction({ dispatch }, payLoad: IPayLoadtype) {
      const { pageName, query } = payLoad
      const requestUrl = `/${pageName}`
      const result = await addPageList(requestUrl, query)
      const callback = () => {
        const params = {
          pageName,
          query: {
            offset: 0,
            size: 10
          }
        }
        dispatch('getDataListAction', params)
      }
      // 显示数据及回调
      showMessage(result, callback)
    },
    // 编辑页面列表的数据
    async editDataListAction({ dispatch }, payLoad: IPayLoadtype) {
      const { pageName, query, userId } = payLoad
      const requestUrl = `/${pageName}/${userId}`
      const result = await editPageList(requestUrl, query)
      const callback = () => {
        const params = {
          pageName,
          query: {
            offset: 0,
            size: 10
          }
        }
        dispatch('getDataListAction', params)
      }
      // 显示数据及回调
      showMessage(result, callback)
    }
  },
  getters: {
    pageDataList(state) {
      // 可以返回一个函数 使得能够动态传入参数 返回相应的数据
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageDataListTotal(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  }
}
export default systemModule
