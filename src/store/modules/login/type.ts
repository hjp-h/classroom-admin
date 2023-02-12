interface IUerMenu {
  [key: string]: any
}
interface ILoginState {
  token: string
  userInfo: any
  userMenu: IUerMenu[]
  permissionList: string[]
}
export { ILoginState }
