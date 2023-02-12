import Crypoto from './cryptoAES'

class LocalCache {
  // 存储
  setItem(key: string, value: any) {
    if (key === 'password') {
      value = Crypoto.encrypt(value)
      window.localStorage.setItem(key, value)
      return
    }
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  // 获取
  getItem(key: string) {
    let value = window.localStorage.getItem(key)
    if (value) {
      if (key === 'password') {
        value = Crypoto.decrypt(value)
        return value
      }
      return JSON.parse(value)
    }
  }
  // 移除
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清除所有
  clear() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
