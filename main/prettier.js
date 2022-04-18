/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 15:28:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 18:30:39
 */
const { ipcMain, BrowserWindow } = require('electron')
const prettier = require('prettier')
const store = require('./store')

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
