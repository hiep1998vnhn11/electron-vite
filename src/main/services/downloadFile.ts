import { app, ipcMain, BrowserWindow, dialog } from 'electron'
import { join } from 'path'
import { arch, platform } from 'os'
import { stat, remove } from 'fs-extra'
import packageInfo from '../../../package.json'

class Main {
  public mainWindow: BrowserWindow = null
  public downloadUrl: string = ''
  public version: string = packageInfo.version
  public baseUrl: string = ''
  public Sysarch: string = arch().includes('64') ? 'win64' : 'win32'
  public HistoryFilePath = join(
    app.getPath('downloads'),
    platform().includes('win32')
      ? `electron_${this.version}_${this.Sysarch}.exe`
      : `electron_${this.version}_mac.dmg`
  )

  constructor(mainWindow: BrowserWindow, downloadUrl?: string) {
    this.mainWindow = mainWindow
    this.downloadUrl =
      downloadUrl || platform().includes('win32')
        ? this.baseUrl + `electron_${this.version}_${this.Sysarch}.exe?${new Date().getTime()}`
        : this.baseUrl + `electron_${this.version}_mac.dmg?${new Date().getTime()}`
  }

  start() {
    ipcMain.on('start-download', (event, msg) => {
      stat(this.HistoryFilePath, async (err, stats) => {
        try {
          if (stats) {
            await remove(this.HistoryFilePath)
          }
          this.mainWindow.webContents.downloadURL(msg.downloadUrl || this.downloadUrl)
        } catch (error) {
          console.log(error)
        }
      })
    })
    this.mainWindow.webContents.session.on(
      'will-download',
      (event: any, item: any, webContents: any) => {
        const filePath = join(app.getPath('downloads'), item.getFilename())
        item.setSavePath(filePath)
        item.on('updated', (event: any, state: String) => {
          switch (state) {
            case 'progressing':
              this.mainWindow.webContents.send(
                'download-progress',
                ((item.getReceivedBytes() / item.getTotalBytes()) * 100).toFixed(0)
              )
              break
            default:
              this.mainWindow.webContents.send('download-error', true)
              dialog.showErrorBox(
                'Lỗi tải xuống',
                'Máy khách bị lỗi download do mạng hoặc không rõ nguyên nhân khác, vui lòng vào trang web chính thức để cài đặt lại'
              )
              break
          }
        })
        item.once('done', (event: any, state: String) => {
          switch (state) {
            case 'completed':
              const data = {
                filePath,
              }
              this.mainWindow.webContents.send('download-done', data)
              break
            case 'interrupted':
              this.mainWindow.webContents.send('download-error', true)
              dialog.showErrorBox(
                'Lỗi tải xuống',
                'Máy khách bị lỗi download do mạng hoặc không rõ nguyên nhân khác, vui lòng vào trang web chính thức để cài đặt lại'
              )
              break
            default:
              break
          }
        })
      }
    )
  }
}

export default Main
