/*
 * @Author: fangt11
 * @Date:   2022-06-01 23:11:57
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-01 23:47:32
 */
const { ipcMain } = require('electron')
const { existsSync } = require('fs')
const { removeSync } = require('fs-extra')
const { resolve } = require('path')
const { execFileSync } = require('child_process')
const { SSH_CONFIG_DIR } = require('./config')

ipcMain.handle('ssh-keygen', (event, config) => {
  const { location, comment } = config
  const locationPath = resolve(SSH_CONFIG_DIR, location)
  if (existsSync(locationPath)) {
    removeSync(locationPath)
    removeSync(resolve(SSH_CONFIG_DIR, `${location}.pub`))
  }
  execFileSync('ssh-keygen', ['-t', 'rsa', '-b', '2046', '-m', 'RFC4716', '-N=""', '-C', comment, '-f', locationPath])
})
