/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:31:01
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 16:11:37
 */
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const os = require('os')
const execa = require('execa')
const glob = require('glob')
const ip = require('ip')
const { isFunction } = require('lodash')

ipcMain.handle('showOpenDialog', (event, options) => {
  return dialog.showOpenDialog(options)
})

ipcMain.on('getProcessVersions', (event, file, args) => {
  event.returnValue = process.versions
})

ipcMain.on('fs', (event, fsFuncName, args) => {
  const res = fs[fsFuncName](args)
  event.returnValue = res
})

ipcMain.handle('os', (event, propName) => {
  const value = os[propName]
  if (propName === 'freemem') {
    return os.freemem()
  }
  if (isFunction(value)) {
    return value()
  }
  return value
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

ipcMain.on('getIp', (event) => {
  event.returnValue = ip.address()
})
