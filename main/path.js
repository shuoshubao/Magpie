/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 18:19:22
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 18:29:49
 */
const { ipcMain } = require('electron')
const { relative } = require('path')
const { HOME_DIR } = require('./config')

ipcMain.on('getShortPath', (event, fullPath) => {
  event.returnValue = ['~/', relative(HOME_DIR, fullPath)].join('')
})
