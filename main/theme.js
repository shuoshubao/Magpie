/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 11:34:35
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 16:51:08
 */
const { ipcMain, BrowserWindow, nativeTheme } = require('electron')
const store = require('./store')

ipcMain.on('getNativeThemeSource', event => {
  event.returnValue = nativeTheme.themeSource
})

ipcMain.on('getTheme', event => {
  event.returnValue = store.get('theme')
})

ipcMain.on('changeTheme', (event, theme) => {
  store.set({ theme })
  BrowserWindow.getAllWindows()[0].webContents.send('theme-updated')
})

nativeTheme.addListener('updated', () => {
  BrowserWindow.getAllWindows()[0].webContents.send('native-theme-updated')
})
