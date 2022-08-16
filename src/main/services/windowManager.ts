import setIpc from './ipcMain'
import config from '@config/index'
import menuconfig from '../config/menu'
import DownloadUpdate from './downloadFile'
import Update from './checkupdate'
import { app, BrowserWindow, Menu, dialog } from 'electron'
import { winURL, loadingURL } from '../config/StaticPath'

class MainInit {
  public winURL: string = ''
  public shartURL: string = ''
  public loadWindow: BrowserWindow = null
  public mainWindow: BrowserWindow = null

  constructor() {
    this.winURL = winURL
    this.shartURL = loadingURL
    if (process.env.NODE_ENV === 'development') {
      menuconfig.push({
        label: 'Cài đặt nhà phát triển',
        submenu: [
          {
            label: 'Chuyển sang chế độ nhà phát triển',
            accelerator: 'CmdOrCtrl+I',
            role: 'toggledevtools',
          },
        ],
      })
    }
  }
  createMainWindow() {
    this.mainWindow = new BrowserWindow({
      height: 800,
      useContentSize: true,
      width: 1700,
      minWidth: 1024,
      minHeight: 400,
      show: false,
      frame: config.IsUseSysTitle,
      // titleBarStyle: 'hidden',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false,
        devTools: process.env.NODE_ENV === 'development',
        scrollBounce: process.platform === 'darwin',
      },
    })
    const menu = Menu.buildFromTemplate(menuconfig as any)
    Menu.setApplicationMenu(menu)
    this.mainWindow.loadURL(this.winURL)
    new DownloadUpdate(this.mainWindow).start()
    new Update(this.mainWindow)
    setIpc.Mainfunc(this.mainWindow, config.IsUseSysTitle)
    this.mainWindow.webContents.once('dom-ready', () => {
      this.mainWindow.show()
      if (config.UseStartupChart) this.loadWindow.destroy()
    })
    if (process.env.NODE_ENV === 'development') {
      this.mainWindow.webContents.openDevTools({ mode: 'undocked', activate: true })
    }
    app.on('render-process-gone', (event, webContents, details) => {
      const message = {
        title: '',
        buttons: [],
        message: '',
      }
      switch (details.reason) {
        case 'crashed':
          message.title = 'Cảnh báo'
          message.buttons = ['Đảm bảo', 'Từ bỏ']
          message.message =
            'Quá trình đồ họa bị treo, bạn có thực hiện thao tác khởi động lại mềm không?'
          break
        case 'killed':
          message.title = 'Cảnh báo'
          message.buttons = ['Đảm bảo', 'Từ bỏ']
          message.message =
            'Quá trình đồ họa bị chấm dứt do không rõ lý do. Bạn có muốn thực hiện thao tác khởi động lại mềm không?'
          break
        case 'oom':
          message.title = 'Cảnh báo'
          message.buttons = ['Đảm bảo', 'Từ bỏ']
          message.message = 'Bộ nhớ không đủ, khởi động lại mềm có giải phóng bộ nhớ không?'
          break

        default:
          break
      }
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) this.mainWindow.reload()
          else this.mainWindow.close()
        })
    })
    this.mainWindow.on('unresponsive', () => {
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: 'Cảnh báo',
          buttons: ['Đảm bảo', 'Từ bỏ'],
          message: 'Quá trình đồ họa không phản hồi, bạn có đợi nó khôi phục không?',
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) this.mainWindow.reload()
          else this.mainWindow.close()
        })
    })

    app.on('child-process-gone', (event, details) => {
      const message = {
        title: '',
        buttons: [],
        message: '',
      }
      switch (details.type) {
        case 'GPU':
          switch (details.reason) {
            case 'crashed':
              message.title = 'Đảm bảo'
              message.buttons = ['确定', 'Từ bỏ']
              message.message =
                'Quá trình tăng tốc phần cứng đã bị lỗi. Bạn có muốn tắt tăng tốc phần cứng và khởi động lại không?'
              break
            case 'killed':
              message.title = 'Đảm bảo'
              message.buttons = ['确定', 'Từ bỏ']
              message.message =
                'Quá trình tăng tốc phần cứng đã bị kết thúc đột ngột. Bạn có muốn tắt tính năng tăng tốc phần cứng và khởi động lại nó không?'
              break
            default:
              break
          }
          break

        default:
          break
      }
      dialog
        .showMessageBox(this.mainWindow, {
          type: 'warning',
          title: message.title,
          buttons: message.buttons,
          message: message.message,
          noLink: true,
        })
        .then((res) => {
          if (res.response === 0) {
            if (details.type === 'GPU') app.disableHardwareAcceleration()
            this.mainWindow.reload()
          } else {
            this.mainWindow.close()
          }
        })
    })
    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }
  loadingWindow(loadingURL: string) {
    this.loadWindow = new BrowserWindow({
      width: 400,
      height: 600,
      frame: false,
      skipTaskbar: true,
      transparent: true,
      resizable: false,
      webPreferences: { experimentalFeatures: true },
    })

    this.loadWindow.loadURL(loadingURL)
    this.loadWindow.show()
    this.loadWindow.setAlwaysOnTop(true)
    setTimeout(() => {
      this.createMainWindow()
    }, 1500)
  }
  initWindow() {
    if (config.UseStartupChart) {
      return this.loadingWindow(this.shartURL)
    } else {
      return this.createMainWindow()
    }
  }
}
export default MainInit
