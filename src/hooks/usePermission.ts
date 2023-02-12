import { useStore } from '@/store'
interface IUserPermission {
  create: boolean
  delete: boolean
  update: boolean
  query: boolean
}
enum IOperate {
  create = 'create',
  delete = 'delete',
  update = 'update',
  query = 'query'
}
export default function (
  moduleName: string,
  pageName: string
): IUserPermission {
  const store = useStore()
  const permissionList = store.state.login.permissionList
  const operateList = ['create', 'delete', 'update', 'query']
  const userPermission: IUserPermission = {
    create: false,
    delete: false,
    update: false,
    query: false
  }
  for (const operate of operateList) {
    const permission = `${moduleName}:${pageName}:${operate}`
    if (permissionList.includes(permission)) {
      switch (operate) {
        case IOperate.create:
          userPermission.create = true
          break
        case IOperate.delete:
          userPermission.delete = true
          break
        case IOperate.update:
          userPermission.update = true
          break
        case IOperate.query:
          userPermission.query = true
          break
        default:
          break
      }
    }
  }
  return userPermission
}
