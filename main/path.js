/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 18:19:22
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 14:49:13
 * @Desc 路径相关处理
 */
const { app, ipcMain } = require('electron')

// https://www.electronjs.org/docs/latest/api/app#appgetpathname
ipcMain.on('getPath', (event, name) => {
  event.returnValue = app.getPath(name)
})
