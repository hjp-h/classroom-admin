// vue api相关
import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 类型相关
import { IRootState, IStoreType } from './type'
// 模块相关
import login from './modules/login/login'
import system from './modules/main/system/system'
import notice from './modules/main/notice/notice'
import suggestion from './modules/main/suggestion/suggestion'
import maintenance from './modules/main/maintenance/maintenance'
import goodsApply from './modules/main/goodsApply/goodsApply'
import comment from './modules/main/comment/comment'
// 请求相关
import { getPageList } from '@/service/main/system/system'
// 缓存
import LocalCache from '../utils/localCache'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'hjp',
      age: 21,
      allDepartment: [],
      allRole: [],
      allMenu: []
    }
  },
  mutations: {
    saveAllDepartment(state, departmentList: any[]) {
      state.allDepartment = departmentList
    },
    saveAllRole(state, roleList: any[]) {
      state.allRole = roleList
    },
    saveAllMenu(state, menuList: any[]) {
      state.allMenu = menuList
    }
  },
  actions: {
    // 获取初始化的数据 部门和角色列表
    async getInitialDataAction({ commit }) {
      const query = {
        offset: 0,
        size: 1000
      }
      const [departmentData, roleData, menuData] = await Promise.all([
        getPageList('/department/list', query),
        getPageList('/role/list', query),
        getPageList('/menu/list', query)
      ])
      const { list: departmentList } = departmentData.data
      const { list: roleList } = roleData.data
      const { list: menuList } = menuData.data
      commit('saveAllDepartment', departmentList)
      commit('saveAllRole', roleList)
      commit('saveAllMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    notice,
    suggestion,
    maintenance,
    goodsApply,
    comment
  }
})
// 解决页面刷新 vuex无数据的问题
export function reloadStore(): void {
  const cacheList = ['token', 'userInfo', 'userMenu'] as string[]
  cacheList.forEach((item) => {
    const cacheItem = LocalCache.getItem(item)
    if (cacheItem) {
      const module = `login/save${item[0].toUpperCase()}${item.slice(1)}`
      store.commit(module, cacheItem)
    }
  })
  store.dispatch('getInitialDataAction')
  store.dispatch('getInitialDataAction')
}
// 对useStore进行封装 为了能在别的地方使用store的时候有提示
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
