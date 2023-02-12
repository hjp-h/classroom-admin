import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/localCache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/main/Main.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/not-found/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 路由导航守卫 判断用户是否已经登录
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getItem('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    const routes = router.getRoutes()
    return routes[0].path
  }
})
// 错误捕获
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
// 解决Loading chunk (\d)+ failed问题
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload()
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  }
})

export default router
