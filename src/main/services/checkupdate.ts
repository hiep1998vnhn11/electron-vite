import { autoUpdater } from 'electron-updater'
import { ipcMain, BrowserWindow } from 'electron'
class Update {
  public mainWindow: BrowserWindow
  constructor(mainWindow: BrowserWindow) {
    autoUpdater.setFeedURL('http://127.0.0.1:25565/')
    this.mainWindow = mainWindow
    this.checkUpdate()
    this.start()
    this.hasData()
    this.noData()
    this.listen()
    this.done()
    this.quitInstall()
    this.error()
  }
  Message(mainWindow: BrowserWindow, type: Number, data?: String) {
    const senddata = {
      state: type,
      msg: data || '',
    }
    mainWindow.webContents.send('UpdateMsg', senddata)
  }

  error() {
    autoUpdater.on('error', (err) => {
      console.log('Xảy ra lỗi', err.message)
      if (err.message.includes('sha512 checksum mismatch')) {
        this.Message(this.mainWindow, -1, 'Lỗi sha512')
      } else {
        this.Message(
          this.mainWindow,
          -1,
          'Vui lòng xem bảng điều khiển quy trình chính để biết thông báo lỗi'
        )
      }
    })
  }

  start() {
    autoUpdater.on('checking-for-update', (event, arg) => {
      console.log('Bắt đầu kiểm tra các bản cập nhật')
      this.Message(this.mainWindow, 0)
    })
  }

  hasData() {
    autoUpdater.on('update-available', (event, arg) => {
      console.log('Có cập nhật tồn tại')
      this.Message(this.mainWindow, 1)
    })
  }

  noData() {
    autoUpdater.on('update-not-available', (event, arg) => {
      console.log('Không có bản cập nhật nào')
      this.Message(this.mainWindow, 2)
    })
  }

  listen() {
    autoUpdater.on('download-progress', (progressObj) => {
      this.Message(this.mainWindow, 3, progressObj)
    })
  }

  done() {
    autoUpdater.on('update-downloaded', () => {
      console.log('Đã tải xuống')
      this.Message(this.mainWindow, 4)
    })
  }

  checkUpdate() {
    ipcMain.handle('check-update', () => {
      autoUpdater.checkForUpdates().catch((err) => {
        console.log('Kiêm tra tải xuống', err)
      })
    })
  }

  quitInstall() {
    ipcMain.handle('confirm-update', () => {
      autoUpdater.quitAndInstall()
    })
  }
}

export default Update
