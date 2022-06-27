/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:07:47
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-17 00:26:06
 * @Desc 窗口-偏好设置
 */

const { app, BrowserWindow } = require('electron')
const Store = require('electron-store')
const { find } = require('lodash')
const { APP_NAME, isDevelopment } = require('./config')

const store = new Store()

console.log(111, app.getPath('userData'))

store.set('theme', 'dark')

const title = [APP_NAME, '设置'].join('-')

const createSettingsWindow = () => {
  const allWindows = BrowserWindow.getAllWindows()

  const aboutWin = find(allWindows, { title })

  if (aboutWin) {
    aboutWin.show()
    return
  }

  const win = new BrowserWindow({
    title,
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.setResizable(false)
  win.setMinimizable(false)

  if (isDevelopment) {
    win.loadURL('http://localhost:8080/#/settings')
  } else {
    win.loadURL(`file://${resolve(__dirname, '../dist')}/index.html/#/settings`)
  }
}

module.exports = {
  createSettingsWindow
}
