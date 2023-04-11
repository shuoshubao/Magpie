/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 18:42:36
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:11:12
 */
const { ipcMain, clipboard, nativeImage } = require('electron')
const { readFileSync, writeFileSync } = require('fs')
const { resolve, isAbsolute } = require('path')
const { appStore } = require('./store')

ipcMain.on('getImageBase64', (event, fullPath) => {
  const res = readFileSync(fullPath)
  event.returnValue = res.toString('base64')
})

ipcMain.on('saveImgae', (event, dataURL, fullPath) => {
  const regex = /^data:image\/png;base64,(.*)$/
  const matches = dataURL.match(regex)
  const data = matches[1]
  const buffer = Buffer.from(data, 'base64')
  let filePath
  if (isAbsolute(fullPath)) {
    filePath = fullPath
  } else {
    const defaultPath = appStore.get('defaultPath')
    filePath = resolve(defaultPath, fullPath)
  }
  writeFileSync(filePath, buffer)
  event.returnValue = filePath
})

ipcMain.on('copyImage', (event, dataURL) => {
  const image = nativeImage.createFromDataURL(dataURL)
  clipboard.writeImage(image)
  event.returnValue = ''
})
