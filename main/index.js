/*
 * @Author: fangt11
 * @Date:   2022-04-07 13:47:44
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-11 20:06:34
 */

const fs = require('fs')
const { resolve, join } = require('path')
const execa = require('execa')
const shell = require('shelljs')
const { app, BrowserWindow, ipcMain, session, dialog } = require('electron')
const { APPLICATIONS_DIR, HOME_DIR } = require('./config')

const isDevelopment = process.env.NODE_ENV === 'development'

let win

app.on('ready', () => {
  win = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
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
})

app.on('ready', () => {
  // require('../server')
})

app.whenReady().then(async () => {
  if (isDevelopment) {
    const reactDevToolsPath = join(
      HOME_DIR,
      '/Library/ApplicationSupport/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_8'
    )
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('getProcessVersions', (event, file, args) => {
  event.returnValue = process.versions
})

ipcMain.on('getNpmConfigUserAgent', (event, file, args) => {
  event.returnValue = process.env.npm_config_user_agent
})

ipcMain.handle('showOpenDialog', (event, options) => {
  return dialog.showOpenDialog(options)
})

ipcMain.on('fs', (event, fsFuncName, args) => {
  const res = fs[fsFuncName](args)
  if (Buffer.isBuffer(res)) {
    event.returnValue = res.toString()
  }
})

ipcMain.on('execaSync', (event, file, args) => {
  event.returnValue = execa.sync(file, args)
})
