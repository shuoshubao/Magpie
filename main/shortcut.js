/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 23:23:18
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-22 13:51:38
 * @Desc 快捷键
 */
const { globalShortcut, app, BrowserWindow } = require('electron')

globalShortcut.register('Command+,', () => {
  BrowserWindow.getAllWindows()[0].webContents.send('showPreferencesModal')
})

globalShortcut.register('Command+Q', () => {
  app.quit()
})
