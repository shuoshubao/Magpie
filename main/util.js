/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 12:18:48
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 13:23:52
 */
const log = require('electron-log')
const execa = require('execa')

const execaCommandSync = command => {
  log.info('execaCommandSync', command)
  const [file, ...args] = command.split(/\s+/)
  return execa.sync(file, args)
}

module.exports.execaCommandSync = execaCommandSync
