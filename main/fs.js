/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 17:54:38
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-26 17:48:55
 */
const { ipcMain } = require('electron')
const fs = require('fs')
const fse = require('fs-extra')

ipcMain.on('fs', (event, fsFuncName, ...args) => {
  const res = fs[fsFuncName](...args)
  if (fsFuncName === 'readFileSync') {
    event.returnValue = res.toString()
  }
  event.returnValue = res
})

ipcMain.on('fse', (event, fsFuncName, ...args) => {
  const res = fse[fsFuncName](...args)
  event.returnValue = res
})
