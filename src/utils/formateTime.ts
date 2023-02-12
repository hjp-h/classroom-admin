import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // 服务器的时间是0时区 我们是东八区 得偏移一个小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
