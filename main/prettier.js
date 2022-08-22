/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 15:28:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:48:26
 */
const { ipcMain } = require('electron')
const prettier = require('prettier')

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
