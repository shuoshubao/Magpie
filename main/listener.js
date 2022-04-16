/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:31:01
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 23:24:07
 * @Desc 事件监听
 */
const { ipcMain, dialog } = require('electron')
const log = require('electron-log')
const fs = require('fs')
const os = require('os')
const execa = require('execa')
const glob = require('glob')
const ip = require('ip')
const axios = require('axios')
const { isFunction } = require('lodash')
const { execaCommandSync } = require('./util')
require('./npm')
require('./path')

axios.interceptors.request.use(request => {
  log.info(
    'axios',
    request.method,
    request.url,
    request.params ? ['params', JSON.stringify(request.params, null)].join(':') : '',
    request.data ? ['data', JSON.stringify(request.data, null)].join(':') : ''
  )
  return request
})

ipcMain.handle('electron.dialog.showOpenDialog', (event, options) => {
  return dialog.showOpenDialog(options)
})

ipcMain.on('getProcessVersions', (event, file, args) => {
  event.returnValue = process.versions
})

ipcMain.on('fs', (event, fsFuncName, ...args) => {
  const res = fs[fsFuncName](...args)
  if (fsFuncName === 'readFileSync') {
    event.returnValue = res.toString()
  }
  event.returnValue = res
})

ipcMain.on('os', (event, propName) => {
  const value = os[propName]
  if (propName === 'freemem') {
    event.returnValue = os.freemem()
  }
  if (isFunction(value)) {
    event.returnValue = value()
  }
  event.returnValue = value
})

ipcMain.on('getImageBase64', (event, fullPath) => {
  const res = fs.readFileSync(fullPath)
  event.returnValue = res.toString('base64')
})

ipcMain.on('execaCommandSync', (event, command) => {
  event.returnValue = execaCommandSync(command)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})

ipcMain.on('getIp', event => {
  event.returnValue = ip.address()
})
