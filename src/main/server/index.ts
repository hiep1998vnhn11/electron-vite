/* eslint-disable prefer-promise-reject-errors */
import app from './server'
import config from '@config/index'
import { createServer } from 'http'
const port = config.BuiltInServerPort
var server = null
app.set('port', port)

export default {
  StatrServer() {
    return new Promise((resolve, reject) => {
      server = createServer(app)
      server.listen(port)
      server.on('error', (error) => {
        switch (error.code) {
          case 'EACCES':
            reject(
              'Không đủ quyền Máy chủ tích hợp không khởi động được. Vui lòng chạy với quyền của quản trị viên.'
            )
            break
          case 'EADDRINUSE':
            reject('Cổng máy chủ tích hợp đã bị chiếm dụng, vui lòng kiểm tra.')
            break
          default:
            reject(error)
        }
      })
      server.on('listening', () => {
        resolve('Máy chủ đang chạy')
      })
    })
  },
  StopServer() {
    return new Promise((resolve, reject) => {
      if (server) {
        server.close()
        server.on('close', () => {
          server = null
          resolve(1)
        })
      } else {
        reject('Máy chủ không mở')
      }
    })
  },
}
