import { globalShortcut } from 'electron'
import config from '@config/index'

export default {
  Disablef12() {
    if (process.env.NODE_ENV === 'production' && config.DisableF12) {
      globalShortcut.register('f12', () => {
        console.log('Người dùng đã cố gắng khởi động bảng điều khiển')
      })
    }
  },
}
