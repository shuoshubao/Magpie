/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 23:23:18
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 13:14:55
 * @Desc 快捷键
 */
const { globalShortcut, BrowserWindow } = require('electron')

globalShortcut.register('Command+,', () => {
  BrowserWindow.getAllWindows()[0].webContents.send('showPreferencesModal')
})
