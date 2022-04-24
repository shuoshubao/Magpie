/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 17:54:38
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 17:56:03
 */
const { ipcMain } = require('electron')
const fs = require('fs')

ipcMain.on('fs', (event, fsFuncName, ...args) => {
  const res = fs[fsFuncName](...args)
  if (fsFuncName === 'readFileSync') {
    event.returnValue = res.toString()
  }
  event.returnValue = res
})
