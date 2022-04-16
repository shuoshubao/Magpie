/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 12:18:48
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 23:43:22
 */
const { BrowserWindow } = require('electron')
const log = require('electron-log')
const execa = require('execa')
const { win } = require('.')

const execaCommandSync = command => {
  log.info('execaCommandSync', command)
  const [file, ...args] = command.split(/\s+/)
  try {
    return execa.sync(file, args)
  } catch (e) {
    BrowserWindow.getAllWindows()[0].webContents.send('showErrorBox', {
      title: ['execa.sync', command].join(': '),
      content: e.message
    })
    log.error('execaCommandSync', e.message)
    return {
      stderr: e
    }
  }
}

module.exports.execaCommandSync = execaCommandSync
