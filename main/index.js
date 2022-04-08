/*
* @Author: fangt11
* @Date:   2022-04-07 13:47:44
* @Last Modified by:   shuoshubao
* @Last Modified time: 2022-04-07 20:44:14
*/

const { resolve, join } = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { readFileSync } = require('fs')

const isDevelopment = process.env.NODE_ENV === 'development'

app.on('ready', () => {
  const win = new BrowserWindow({
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

ipcMain.on('get-pkg', (event, arg) => {
  const pkg = readFileSync(join(__dirname, '../package.json')).toString()
  event.sender.send('get-pkg-reply', pkg, { a: 1 })
})

ipcMain.on('sync-get-pkg', (event, arg) => {
  const pkg = readFileSync(join(__dirname, '../package.json')).toString()
  event.returnValue = pkg
})
