/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 14:07:47
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-22 13:42:41
 * @Desc 窗口-关于
 */

const { BrowserWindow } = require('electron')
const { resolve } = require('path')
const { find } = require('lodash')
const { APP_NAME, isDevelopment } = require('./config')

const title = ['关于', APP_NAME].join('')

const createAboutWindow = () => {
  const allWindows = BrowserWindow.getAllWindows()

  const aboutWin = find(allWindows, { title })

  if (aboutWin) {
    aboutWin.show()
    return
  }

  const win = new BrowserWindow({
    title,
    width: 360,
    height: 260,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.setResizable(false)
  win.setMinimizable(false)

  if (isDevelopment) {
    win.loadURL('http://localhost:8080/#/about')
  } else {
    win.loadURL(`file://${resolve(__dirname, '../dist')}/index.html/#/about`)
  }
}

module.exports = {
  createAboutWindow
}
