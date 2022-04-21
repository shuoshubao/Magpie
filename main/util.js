/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 12:18:48
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 23:43:22
 */
const { BrowserWindow } = require('electron')
const log = require('electron-log')
const spawn = require('cross-spawn')
const { win } = require('.')

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

module.exports.execaCommandSync = execaCommandSync
