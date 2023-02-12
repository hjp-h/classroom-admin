import { breadCrumbItem } from '@/base-ui/breadCrumb'
import { RouteRecordRaw } from 'vue-router'
// 将用户菜单与路由进行一个匹配 生成动态路由
export default function (userMenus: any[]): RouteRecordRaw[] {
  // 1.先找出所有权限的路由集合
  const allRoutes: RouteRecordRaw[] = []
  const routes: RouteRecordRaw[] = []
  // 读取router/main文件夹下各个模块的配置信息
  const routeFiles = require.context('../router/main', true, /\.ts$/)
  routeFiles.keys().forEach((filePath) => {
    //拿到的key是匹配到的文件路径
    // 导入文件 拿到里面的default值
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require(`../router/main${filePath.split('.')[1]}`)
    allRoutes.push(route.default)
  })

  // 2.根据userMenus里的url来匹配路由注册配置
  // 通过递归来实现
  const recurseGetRoute = function (userMenus: any[]) {
    for (const menu of userMenus) {
      // type 为2 说明是没有子菜单 直接匹配
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url)
        route && routes.push(route)
      }
      // type 为1 则说明他有子菜单 继续向下匹配
      else if (menu.type === 1) {
        recurseGetRoute(menu.children)
      }
    }
  }

  // 3.调用实现
  recurseGetRoute(userMenus)
  return routes
}

// 面包屑工具
export function mapRouteToBreadcrumb(
  curPath: string,
  userMenu: any
): breadCrumbItem[] {
  const breadCrumbItemList: breadCrumbItem[] = []
  return mapRouteToUserMenu(curPath, userMenu, breadCrumbItemList)
}
// 根据当前路径找出对应的菜单项
export function mapRouteToUserMenu(
  curPath: string,
  userMenu: any,
  breadCrumbItemList?: breadCrumbItem[]
): any {
  // 遍历userMenu找出curPath对应的menuItem
  for (const menu of userMenu) {
    // 判断当前菜单的类型 是一级菜单还是有二级菜单
    if (menu.type === 1) {
      // type === 1 说明还有下一级子菜单 递归调用
      const menuItem = mapRouteToUserMenu(curPath, menu.children)
      // 有结果则返回
      if (menuItem) {
        // 判断是否有传面包屑
        if (breadCrumbItemList) {
          breadCrumbItemList.push({ name: menu.name })
          breadCrumbItemList.push({ name: menuItem.name, url: menuItem.url })
          return breadCrumbItemList
        }
        return menuItem
      }
      // type === 2 说明没有下一级子菜单了
    } else if (menu.type === 2 && curPath === menu.url) {
      return menu
    }
  }
}

// 将用户菜单中的permission映射成一个数组
export function mapMenuToPermission(menu: any[]): string[] {
  console.log('menu', menu)
  const permissionList: string[] = []
  // 递归拿出permission 字段放入数组中
  function recurciveGetPermission(menu: any[]) {
    for (const item of menu) {
      if (item.type === 3) {
        permissionList.push(item.permission)
      } else {
        recurciveGetPermission(item.children ?? [])
      }
    }
  }
  recurciveGetPermission(menu)
  console.log('permissionList', permissionList)
  return permissionList
}

// 从menulist中找出id
export function mapMenuToIds(menu: any[]): number[] {
  const menuIds: number[] = []
  // 递归拿出id 字段放入数组中
  function recurciveGetMenuIds(menu: any[]) {
    for (const item of menu) {
      if (item.children) {
        recurciveGetMenuIds(item.children)
      } else {
        menuIds.push(item.id)
      }
    }
  }
  recurciveGetMenuIds(menu)
  return menuIds
}
