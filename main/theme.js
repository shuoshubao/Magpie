/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 11:34:35
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 13:35:53
 */
const { ipcMain, BrowserWindow, nativeTheme } = require('electron')
const store = require('./store')

if (!store.get('theme')) {
  store.set({ theme: 'light' })
}

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
