// 一定要记得安装@types/crypto-js
import CryptoJS from 'crypto-js'
// 定义接口 包含encrypt和decrypt方法
interface CrypotoType {
  encrypt: (msg: any) => string
  decrypt: (msg: any) => string
}
class Crypoto implements CrypotoType {
  // 秘钥
  private key = 'hjp123'
  encrypt(msg: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(msg), this.key).toString()
  }

  decrypt(msg: any): string {
    const bytes = CryptoJS.AES.decrypt(msg, this.key)
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }
}
export default new Crypoto()
