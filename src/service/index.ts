import JPRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '../utils/localCache'

const jpRequest = new JPRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 成功的拦截
    requestInterceptor: (config: any) => {
      // 获取token
      console.log('创建实例时的成功拦截')
      const token = localCache.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (error: any) => {
      console.log('请求失败的拦截', error)
    },
    responseInterceptor: (res: any) => {
      console.log('创建实例时的响应成功拦截')
      return res.data
    },
    responseInterceptorCatch: (error: any) => {
      console.log('响应失败的拦截', error)
    }
  }
})

export default jpRequest
