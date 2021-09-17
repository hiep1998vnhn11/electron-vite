import { ipcMain, dialog, BrowserWindow } from 'electron'
import Server from '../server'
import { winURL } from '../config/StaticPath'
import { updater } from './HotUpdater'

export default {
  Mainfunc(mainWindow: BrowserWindow, IsUseSysTitle: Boolean) {
    ipcMain.handle('IsUseSysTitle', async () => {
      return IsUseSysTitle
    })
    ipcMain.handle('windows-mini', () => {
      mainWindow.minimize()
    })
    ipcMain.handle('window-max', async () => {
      if (mainWindow.isMaximized()) {
        mainWindow.restore()
        return { status: false }
      } else {
        mainWindow.maximize()
        return { status: true }
      }
    })
    ipcMain.handle('window-close', () => {
      mainWindow.close()
    })
    ipcMain.handle('open-messagebox', async (event, arg) => {
      const res = await dialog.showMessageBox(mainWindow, {
        type: arg.type || 'info',
        title: arg.title || '',
        buttons: arg.buttons || [],
        message: arg.message || '',
        noLink: arg.noLink || true,
      })
      return res
    })
    ipcMain.handle('open-errorbox', (event, arg) => {
      dialog.showErrorBox(arg.title, arg.message)
    })
    ipcMain.handle('start-server', async () => {
      try {
        const serveStatus = await Server.StatrServer()
        console.log(serveStatus)
        return serveStatus
      } catch (error) {
        dialog.showErrorBox('错误', error)
      }
    })
    ipcMain.handle('stop-server', async (event, arg) => {
      try {
        const serveStatus = await Server.StopServer()
        return serveStatus
      } catch (error) {
        dialog.showErrorBox('错误', error)
      }
    })
    ipcMain.handle('hot-update', (event, arg) => {
      updater(mainWindow)
    })
    ipcMain.handle('open-win', (event, arg) => {
      const ChildWin = new BrowserWindow({
        height: 595,
        useContentSize: true,
        width: 842,
        autoHideMenuBar: true,
        minWidth: 842,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false,
          devTools: process.env.NODE_ENV === 'development',
          // devTools: true,
          scrollBounce: process.platform === 'darwin',
        },
      })
      ChildWin.loadURL(winURL + `#${arg.url}`)
      ChildWin.webContents.once('dom-ready', () => {
        ChildWin.show()
        setTimeout(() => {
          ChildWin.webContents.send('send-data-test', arg.sendData)
        }, 1000)
        if (arg.IsPay) {
          const testUrl = setInterval(() => {
            const Url = ChildWin.webContents.getURL()
            if (Url.includes(arg.PayUrl)) {
              ChildWin.close()
            }
          }, 1200)
          ChildWin.on('close', () => {
            clearInterval(testUrl)
          })
        }
      })
    })
  },
}
