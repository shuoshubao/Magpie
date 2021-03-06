/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:07:47
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 21:13:16
 * @Desc 窗口-日志
 */

const { BrowserWindow } = require('electron')
const { resolve } = require('path')
const { find } = require('lodash')
const { APP_NAME, isDevelopment } = require('./config')

const title = [APP_NAME, '日志'].join('-')

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
