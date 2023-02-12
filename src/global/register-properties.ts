import type { App } from 'vue'
import { formatUtcString } from '@/utils/formateTime'
export default function (app: App) {
  app.config.globalProperties.$filter = {
    formatTime(utcTime: string) {
      return formatUtcString(utcTime)
    }
  }
}
