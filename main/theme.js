/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 11:34:35
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 18:03:55
 */
const { ipcMain, BrowserWindow, nativeTheme } = require('electron')
const store = require('./store')

ipcMain.on('getNativeThemeSource', (event, file, args) => {
  event.returnValue = nativeTheme.themeSource
})

ipcMain.on('getTheme', (event, file, args) => {
  event.returnValue = store.get('theme')
})

ipcMain.on('changeTheme', (event, theme) => {
  store.set({ theme })
  BrowserWindow.getAllWindows()[0].webContents.send('theme-updated')
})

nativeTheme.addListener('updated', event => {
  BrowserWindow.getAllWindows()[0].webContents.send('native-theme-updated')
})
