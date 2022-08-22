/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:31:01
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-01 23:28:13
 * @Desc 事件监听
 */
const { ipcMain, BrowserWindow, dialog } = require('electron')
const log = require('electron-log')
const os = require('os')
const ip = require('ip')
const axios = require('axios')
const { isFunction } = require('lodash')
const { execaCommandSync } = require('./util')
require('./npm')
require('./path')
require('./fs')
require('./theme')
require('./prettier')
require('./image')
require('./project-analysis')
require('./ssh')

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

ipcMain.on('getProcessVersions', event => {
  event.returnValue = process.versions
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

ipcMain.on('execaCommandSync', (event, command) => {
  event.returnValue = execaCommandSync(command)
})

ipcMain.on('getIp', event => {
  event.returnValue = ip.address()
})
