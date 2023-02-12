import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { JPRequestConfig, JPRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
//对axios进行封装
//1.配置实例 2.配置拦截器 3.配置请求loading

// 拦截的顺序
// 特定接口的请求拦截
// 每个实例都有的请求成功拦截
// 创建实例时的成功拦截
// 创建实例时的响应成功拦截
// 每个实例都有的响应成功拦截
// 特定接口的响应拦截
const DEFAULT_LOADING = true
export default class JPRequest {
  // 实例对象
  instance: AxiosInstance
  // 拦截器
  interceptors?: JPRequestInterceptors
  // 加载状态
  isLoading?: ILoadingInstance
  showLoading: boolean
  // 每new一个类就创建一个axios实例 防止出现axios基本配置不同的情况
  constructor(config: JPRequestConfig) {
    // 初始化赋值
    this.instance = axios.create(config)
    this.showLoading = true
    this.interceptors = config.interceptors
    // 1.如果创建实例时有使用拦截器，则进行拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.每个实例都会有的拦截写死的
    this.instance.interceptors.request.use(
      (config) => {
        // 配置请求时加载时的图标
        if (this.showLoading) {
          this.isLoading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        console.log('每个实例都有的请求成功拦截')
        return config
      },
      (err) => {
        console.log('每个实例都会有的请求失败拦截', err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('每个实例都有的响应成功拦截')
        setTimeout(() => {
          this.isLoading?.close()
        }, 1000)
        return res
      },
      (err) => {
        console.log('每个实例都会有的响应失败拦截', err)
      }
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  request<T>(config: JPRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 3.对某个请求的特定拦截
      // 3.1判断是否传了showLoadind的属性
      this.showLoading = config.showLoading ?? DEFAULT_LOADING
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            console.log('特定接口的响应拦截')
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
          // 还原默认值 防止下一个请求的showLoading也被修改
          this.showLoading = DEFAULT_LOADING
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
  get<T>(config: JPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: JPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: JPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: JPRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
