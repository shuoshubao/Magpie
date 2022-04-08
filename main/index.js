/*
 * @Author: fangt11
 * @Date:   2022-04-07 13:47:44
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-08 13:39:13
 */

const { resolve, join } = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const { readFileSync } = require('fs')

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
