/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 11:34:35
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:11:03
 */
const { ipcMain, BrowserWindow, nativeTheme } = require('electron')
const { appStore } = require('./store')

ipcMain.on('getNativeThemeSource', event => {
  event.returnValue = nativeTheme.themeSource
})

ipcMain.on('getTheme', event => {
  event.returnValue = appStore.get('theme')
})

ipcMain.on('changeTheme', (event, theme) => {
  appStore.set({ theme })
  BrowserWindow.getAllWindows()[0].webContents.send('theme-updated')
})

nativeTheme.addListener('updated', () => {
  BrowserWindow.getAllWindows()[0].webContents.send('native-theme-updated')
})
