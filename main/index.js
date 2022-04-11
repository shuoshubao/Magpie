/*
 * @Author: fangt11
 * @Date:   2022-04-07 13:47:44
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-11 12:09:46
 */

const { readFileSync } = require('fs')
const { resolve, join } = require('path')
const os = require('os')
const execa = require('execa')
const { app, BrowserWindow, ipcMain, session } = require('electron')

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
  require('../server')
})

app.whenReady().then(async () => {
  if (isDevelopment) {
    const reactDevToolsPath = join(
      os.homedir(),
      '/Library/ApplicationSupport/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.24.3_8'
    )
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }
})

ipcMain.on('execaSync', (event, file, args) => {
  event.returnValue = execa.sync(file, args)
})
