import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// 拦截接口的封装
// 三个层面的拦截 实例按需拦截 所有实例都拦截 某个单独请求的拦截
export interface JPRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  // 定义接口时内部函数的类型由调用者决定时 需要在最外部的接口设置泛型 再传进来
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

// 请求参数的封装
export interface JPRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: JPRequestInterceptors<T>
  showLoading?: boolean
}
