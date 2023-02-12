import jpRequest from '../../index'
import { IDataType, ICommonObj } from '@/global/type'
// 获取页面列表接口
export function getPageList(url: string, data: ICommonObj) {
  return jpRequest.post<IDataType>({
    url,
    data
  })
}
// 删除表的数据
export function delPageList(url: string, data: ICommonObj) {
  return jpRequest.delete<IDataType>({
    url,
    data
  })
}

// 添加表的数据
export function addPageList(url: string, data: ICommonObj) {
  return jpRequest.post<IDataType>({
    url,
    data
  })
}

// 修改表的数据
export function editPageList(url: string, data: ICommonObj) {
  return jpRequest.patch<IDataType>({
    url,
    data
  })
}
