/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 15:28:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 16:19:02
 */
const { ipcMain, BrowserWindow } = require('electron')
const prettier = require('prettier')
const store = require('./store')

ipcMain.on('getPrettierFormatCode', (event, source, options) => {
  try {
    event.returnValue = {
      stderr: '',
      stdout: prettier.format(source, options)
    }
  } catch (e) {
    event.returnValue = {
      stderr: e.message,
      stdout: ''
    }
  }
})
