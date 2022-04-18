/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 15:28:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 15:58:07
 */
const { ipcMain, BrowserWindow } = require('electron')
const prettier = require('prettier')
const store = require('./store')
const { prettierConfig } = require('./config')

if (!store.get('prettierConfig')) {
  store.set({ prettierConfig })
}

ipcMain.on('getPrettierConfig', event => {
  event.returnValue = store.get('prettierConfig')
})

ipcMain.on('setPrettierConfig', (event, config) => {
  store.set('prettierConfig', config)
})

ipcMain.on('getPrettierFormatCode', (event, source, options) => {
  try {
    event.returnValue = {
      message: '',
      code: prettier.format(source, options)
    }
  } catch (e) {
    event.returnValue = {
      message: e.message,
      code: ''
    }
  }
})
