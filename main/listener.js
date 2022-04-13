/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:31:01
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 19:51:16
 */
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const os = require('os')
const execa = require('execa')
const glob = require('glob')
const ip = require('ip')
const ini = require('ini')
const { isFunction } = require('lodash')
const { NPMRC_PATH } = require('./config')

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

ipcMain.on('getNpmrc', (event, filePath) => {
  const content = fs.readFileSync(NPMRC_PATH).toString()
  event.returnValue = content ? ini.parse(content) : {}
})

ipcMain.on('execaCommandSync', (event, command) => {
  const [file, ...args] = command.split(/\s+/)
  event.returnValue = execa.sync(file, args)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})

ipcMain.on('getIp', event => {
  event.returnValue = ip.address()
})
