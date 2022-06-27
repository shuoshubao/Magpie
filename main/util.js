/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 12:18:48
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-05-31 17:27:40
 * @Desc: 辅助函数
 */
const { ipcMain, BrowserWindow } = require('electron')
const log = require('electron-log')
const spawn = require('cross-spawn')
const ini = require('ini')

const execaCommandSync = command => {
  log.info('execaCommandSync', command)
  const [file, ...args] = command.split(/\s+/)
  try {
    const res = spawn.sync(file, args)
    return res.stdout.toString().trim()
  } catch (e) {
    BrowserWindow.getAllWindows()[0].webContents.send('showErrorBox', {
      title: ['spawn.sync', command].join(': '),
      content: e.message
    })
    log.error('execaCommandSync', e.message)
    return {
      stderr: e
    }
  }
}

ipcMain.on('ini', (event, iniFn, ...args) => {
  event.returnValue = ini[iniFn](...args)
})

module.exports.execaCommandSync = execaCommandSync
