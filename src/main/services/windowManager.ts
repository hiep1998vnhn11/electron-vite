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
        label: '开发者设置',
        submenu: [
          {
            label: '切换到开发者模式',
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
      minWidth: 1366,
      show: false,
      frame: config.IsUseSysTitle,
      titleBarStyle: 'hidden',
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false,
        devTools: process.env.NODE_ENV === 'development',
        // devTools: true,
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
    // this.mainWindow.webContents.openDevTools({ mode: 'undocked', activate: true })
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
          message.title = '警告'
          message.buttons = ['确定', '退出']
          message.message = '图形化进程崩溃，是否进行软重启操作？'
          break
        case 'killed':
          message.title = '警告'
          message.buttons = ['确定', '退出']
          message.message = '由于未知原因导致图形化进程被终止，是否进行软重启操作？'
          break
        case 'oom':
          message.title = '警告'
          message.buttons = ['确定', '退出']
          message.message = '内存不足，是否软重启释放内存？'
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
          title: '警告',
          buttons: ['重载', '退出'],
          message: '图形化进程失去响应，是否等待其恢复？',
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
              message.title = '警告'
              message.buttons = ['确定', '退出']
              message.message = '硬件加速进程已崩溃，是否关闭硬件加速并重启？'
              break
            case 'killed':
              message.title = '警告'
              message.buttons = ['确定', '退出']
              message.message = '硬件加速进程被意外终止，是否关闭硬件加速并重启？'
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
