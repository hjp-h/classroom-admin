// process.env.NODE_ENV
// 当前环境
const environment = process.env.NODE_ENV
const TIME_OUT = 5000
let BASE_URL = ''
if (environment === 'production') {
  BASE_URL = '/api'
} else if (environment === 'development') {
  BASE_URL = '/api'
} else {
  BASE_URL = 'http://123.207.32.32:8000'
}
export { BASE_URL, TIME_OUT }
