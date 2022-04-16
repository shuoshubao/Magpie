/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:07:47
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 22:42:23
 */

const { BrowserWindow } = require('electron')
const { find } = require('lodash')
const { APP_NAME, isDevelopment } = require('./config')

const title = [APP_NAME, '运行日志'].join('-')

const createLogWindow = () => {
  const allWindows = BrowserWindow.getAllWindows()

  const aboutWin = find(allWindows, { title })

  if (aboutWin) {
    aboutWin.show()
    return
  }

  const win = new BrowserWindow({
    title,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.maximize()

  win.setResizable(false)
  win.setMinimizable(false)

  if (isDevelopment) {
    win.loadURL('http://localhost:8080/#/log')
  } else {
    win.loadURL(`file://${resolve(__dirname, '../dist')}/index.html/#/log`)
  }
}

module.exports = {
  createLogWindow
}
