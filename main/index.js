/*
 * @Author: fangt11
 * @Date:   2022-04-07 13:47:44
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 20:10:33
 */

const fs = require('fs')
const { resolve, join } = require('path')
const { app, BrowserWindow, ipcMain, session, dialog } = require('electron')
const log = require('electron-log')
const execa = require('execa')
const glob = require('glob')
const fixPath = require('fix-path')
const { APPLICATIONS_DIR, HOME_DIR } = require('./config')

const isDevelopment = process.env.NODE_ENV === 'development'

if (!isDevelopment) {
  fixPath()
}

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
  require('../server')
})

app.whenReady().then(async () => {
  if (isDevelopment) {
    const reactDevToolsPath = join(
      HOME_DIR,
      '/Library/ApplicationSupport/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_0'
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

ipcMain.handle('showOpenDialog', (event, options) => {
  return dialog.showOpenDialog(options)
})

ipcMain.on('fs', (event, fsFuncName, args) => {
  const res = fs[fsFuncName](args)
  if (Buffer.isBuffer(res)) {
    event.returnValue = res.toString()
    return
  }
  event.returnValue = res
})

ipcMain.on('getImageBase64', (event, filePath) => {
  const res = fs.readFileSync(filePath)
  event.returnValue = res.toString('base64')
})

ipcMain.on('execaSync', (event, file, args) => {
  event.returnValue = execa.sync(file, args)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})
