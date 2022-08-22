/*
 * @Description: 文件描述
 * @Author: shuoshubao
 * @Date: 2022-04-02 15:34:42
 * @LastEditTime: 2022-04-02 15:55:15
 * @LastEditors: shuoshubao
 */

//引入两个模块：app 和 BrowserWindow

//app 模块，控制整个应用程序的事件生命周期。
//BrowserWindow 模块，它创建和管理程序的窗口。

const { resolve } = require('path')
const { app, BrowserWindow } = require('electron')

const isDevelopment = process.env.NODE_ENV === 'development'

//在 Electron 中，只有在 app 模块的 ready 事件被激发后才能创建浏览器窗口
app.on('ready', () => {
  //创建一个窗口
  const mainWindow = new BrowserWindow()

  mainWindow.maximize()

  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:8080/')
  } else {
    mainWindow.loadURL(`file://${resolve(__dirname, '../dist')}/index.html`)
  }
})
