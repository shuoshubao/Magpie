/*
 * @Author: fangt11
 * @Date:   2022-04-07 13:47:44
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 13:01:21
 */
const { resolve } = require('path')
const { app, BrowserWindow, ipcMain, session } = require('electron')
const log = require('electron-log')
const { isDevelopment, HOME_DIR } = require('./config')

if (!isDevelopment) {
  const fixPath = require('fix-path')
  fixPath()
}

let win

app.on('ready', () => {
  win = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    width: 1200,
    height: 600,
    webPreferences: {
      preload: resolve(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.maximize()

  if (isDevelopment) {
    win.loadURL('http://localhost:8080/')
    win.webContents.openDevTools()
  } else {
    win.loadURL(`file://${resolve(__dirname, '../dist')}/index.html`)
  }

  win.on('close', () => {
    app.quit()
  })

  require('../server')
})

app.on('activate', e => {
  if (!win.isVisible()) {
    win.show()
  }
})

ipcMain.on('show', () => {
  win.show()
  win.focus()
})

app
  .whenReady()
  .then(async () => {
    if (isDevelopment) {
      const reactDevToolsPath = resolve(
        HOME_DIR,
        '/Library/ApplicationSupport/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_0'
      )
      await session.defaultSession.loadExtension(reactDevToolsPath)
    }
  })
  .finally(() => {
    require('./menu')
  })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

require('./listener')
