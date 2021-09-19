import { emptyDir, createWriteStream, readFile, copy } from 'fs-extra'
import { join, resolve } from 'path'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { app, BrowserWindow } from 'electron'
import { gt } from 'semver'
import { createHmac } from 'crypto'
import extract from 'extract-zip'
import { version } from '../../../package.json'
import { hotPublishConfig } from '../config/hotPublish'
import axios from 'axios'

const streamPipeline = promisify(pipeline)
const appPath = app.getAppPath()
const updatePath = resolve(appPath, '..', '..', 'update')
const request = axios.create({ adapter: require('axios/lib/adapters/http') })

function hash(data, type = 'sha256', key = 'Sky') {
  const hmac = createHmac(type, key)
  hmac.update(data)
  return hmac.digest('hex')
}

async function download(url: string, filePath: string) {
  const res = await request({ url, responseType: 'stream' })
  await streamPipeline(res.data, createWriteStream(filePath))
}

const updateInfo = {
  status: 'init',
  message: '',
}

export const updater = async (windows?: BrowserWindow) => {
  try {
    const res = await request({
      url: `${hotPublishConfig.url}/${
        hotPublishConfig.configName
      }.json?time=${new Date().getTime()}`,
    })
    if (gt(res.data.version, version)) {
      await emptyDir(updatePath)
      const filePath = join(updatePath, res.data.name)
      updateInfo.status = 'downloading'
      if (windows) windows.webContents.send('hot-update-status', updateInfo)
      await download(hotPublishConfig.url, filePath)
      const buffer = await readFile(filePath)
      const sha256 = hash(buffer)
      if (sha256 !== res.data.hash) throw new Error('sha256 error')
      const appPathTemp = join(updatePath, 'temp')
      await extract(filePath, { dir: appPathTemp })
      updateInfo.status = 'moving'
      if (windows) windows.webContents.send('hot-update-status', updateInfo)
      await emptyDir(appPath)
      await copy(appPathTemp, appPath)
      updateInfo.status = 'finished'
      if (windows) windows.webContents.send('hot-update-status', updateInfo)
      resolve('success')
    }
  } catch (error) {
    updateInfo.status = 'failed'
    updateInfo.message = error
    if (windows) windows.webContents.send('hot-update-status', updateInfo)
  }
}

export const getUpdateInfo = () => updateInfo
