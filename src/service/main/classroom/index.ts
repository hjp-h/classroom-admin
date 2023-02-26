import jpRequest from '../../index'
import { IDataType, ICommonObj } from '@/global/type'
export * from '../system/system'
export function getClassroomListReq(data: ICommonObj): Promise<IDataType> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const { data: res } = await jpRequest.post<IDataType>({
      url: '/classroom/list',
      data
    })
    resolve({
      data: res?.list?.map((item: any) => ({
        value: item.id,
        label: item.name
      })),
      code: 1,
      message: 'success'
    })
  })
}
