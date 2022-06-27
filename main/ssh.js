/*
 * @Author: fangt11
 * @Date:   2022-06-01 23:11:57
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-02 23:18:21
 */
const { ipcMain } = require('electron')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { removeSync } = require('fs-extra')
const { resolve } = require('path')
const SSHConfig = require('ssh-config')
const { execFileSync } = require('child_process')
const { cloneDeep } = require('lodash')
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

ipcMain.handle('ssh-config', (event, action, config) => {
  const { configName, hostName, name } = config
  const sshConfigPath = resolve(SSH_CONFIG_DIR, 'config')
  const content = readFileSync(sshConfigPath).toString()
  const sshConfig = SSHConfig.parse(content)
  // 新增
  if (action === 'append') {
    const newSSHConfigSection = {
      Host: hostName,
      HostName: hostName,
      User: name,
      PreferredAuthentications: 'publickey',
      IdentityFile: resolve(SSH_CONFIG_DIR, configName)
    }
    sshConfig.append(newSSHConfigSection)
  }
  // 删除
  if (action === 'remove') {
    sshConfig.remove({ Host: hostName })
  }
  writeFileSync(sshConfigPath, SSHConfig.stringify(sshConfig))
})
