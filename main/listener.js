/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:31:01
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 20:45:25
 */
const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const execa = require('execa')
const glob = require('glob')

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

ipcMain.on('getImageBase64', (event, filePath) => {
  const res = fs.readFileSync(filePath)
  event.returnValue = res.toString('base64')
})

ipcMain.on('execaSync', (event, file, args) => {
  event.returnValue = execa.sync(file, args)
})

ipcMain.on('globSync', (event, pattern, options) => {
  event.returnValue = glob.sync(pattern, options)
})
