import { ElMessage } from 'element-plus'
interface IInfo {
  code: number
  data: any
  message: string
}
type callbackFn = () => void
export function showMessage(info: IInfo, callback?: callbackFn) {
  const { code, message } = info
  if (code === 200) {
    ElMessage({
      message: message ?? '操作成功',
      type: 'success'
    })
    callback?.()
  } else {
    ElMessage({
      message: message ?? '操作失败',
      type: 'error'
    })
  }
}
