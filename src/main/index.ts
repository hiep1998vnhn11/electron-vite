'use strict'

import { app } from 'electron'
import InitWindow from './services/windowManager'
import DisableButton from './config/DisableButton'
import electronDevtoolsInstaller, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

function onAppReady() {
  new InitWindow().initWindow()
  DisableButton.Disablef12()
  if (process.env.NODE_ENV === 'development') {
    electronDevtoolsInstaller(VUEJS3_DEVTOOLS)
      .then((name) => console.log(`已安装: ${name}`))
      .catch((err) => console.log('无法安装 `vue-devtools`: \n', err))
  }
}

app.isReady() ? onAppReady() : app.on('ready', onAppReady)
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')

app.on('window-all-closed', () => {
  app.quit()
})
app.on('browser-window-created', () => {
  console.log('window-created')
})

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.removeAsDefaultProtocolClient('electron-vue-template')
    console.log('由于框架特殊性开发环境下无法使用')
  }
} else {
  app.setAsDefaultProtocolClient('electron-vue-template')
}
