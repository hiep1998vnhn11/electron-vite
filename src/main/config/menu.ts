import { dialog } from 'electron'
import { type, arch, release } from 'os'
import packageInfo from '../../../package.json'

const menu = [
  {
    label: 'Cài đặt',
    submenu: [
      {
        label: 'Khởi động lại',
        accelerator: 'F5',
        role: 'reload',
      },
      {
        label: 'Đóng',
        accelerator: 'CmdOrCtrl+F4',
        role: 'close',
      },
    ],
  },
  {
    label: 'Trợ giúp',
    submenu: [
      {
        label: 'Về sản phẩm',
        click: function () {
          info()
        },
      },
    ],
  },
]
function info() {
  dialog.showMessageBox({
    title: 'Về sản phẩm',
    type: 'info',
    message: 'Electron with vite vue3 typescript',
    detail: `Phiên bản ${packageInfo.version}\n Version${
      process.versions.v8
    }\m Release${type()} ${arch()} ${release()}`,
    noLink: true,
    buttons: ['Github', 'Tải về'],
  })
}

export default menu
