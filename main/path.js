/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 18:19:22
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 16:49:12
 * @Desc 路径相关处理
 */
const { app, ipcMain } = require('electron')
const glob = require('glob')

// https://www.electronjs.org/docs/latest/api/app#appgetpathname
ipcMain.on('getPath', (event, name) => {
  event.returnValue = app.getPath(name)
})

ipcMain.on('path', (event, pathFuncName, ...args) => {
  event.returnValue = fs[pathFuncName](...args)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})
