/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 18:19:22
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-01 11:18:11
 * @Desc 路径相关处理
 */
const { app, ipcMain } = require('electron')
const path = require('path')
const glob = require('glob')

// https://www.electronjs.org/docs/latest/api/app#appgetpathname
ipcMain.on('getPath', (event, name) => {
  event.returnValue = app.getPath(name)
})

ipcMain.on('path', (event, pathFuncName, ...args) => {
  event.returnValue = path[pathFuncName](...args)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})
