/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 18:42:36
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-19 13:46:37
 */
const { ipcMain, clipboard, nativeImage } = require('electron')
const { writeFileSync } = require('fs')
const { resolve, isAbsolute } = require('path')
const store = require('./store')

ipcMain.on('saveImgae', (event, dataURL, fullPath) => {
  const regex = /^data:image\/png;base64,(.*)$/
  const matches = dataURL.match(regex)
  const data = matches[1]
  const buffer = Buffer.from(data, 'base64')
  let filePath
  if (isAbsolute(fullPath)) {
    filePath = fullPath
  } else {
    const defaultPath = store.get('defaultPath')
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
