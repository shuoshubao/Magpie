/*
 * @Author: fangt11
 * @Date:   2022-06-01 23:11:57
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-06 15:50:11
 */
const { ipcMain } = require('electron')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { removeSync } = require('fs-extra')
const { resolve } = require('path')
const glob = require('glob')
const { execFileSync } = require('child_process')
const ini = require('ini')
const SSHConfig = require('ssh-config')
const { cloneDeep } = require('lodash')
const { GIT_CONFIG_PATH, GIT_CONFIG_DIR, SSH_CONFIG_DIR } = require('./config')

// gitdirs
const parseGitDirs = () => {
  const gitConfigContent = readFileSync(GIT_CONFIG_PATH).toString()
  const gitConfig = ini.parse(gitConfigContent)
  return Object.entries(gitConfig).reduce((prev, [k, v]) => {
    if (!k.startsWith('includeIf')) {
      return prev
    }
    const gitdir = k.slice(18, -1)
    const { path } = v
    if (prev[path]) {
      prev[path].push(gitdir)
    } else {
      prev[path] = [gitdir]
    }
    return prev
  }, {})
}

const updateGitDirs = (configName, gitdirs) => {
  const gitConfigContent = readFileSync(GIT_CONFIG_PATH).toString()
  const gitConfig = ini.parse(gitConfigContent)
  const gitConfigPath = resolve(GIT_CONFIG_DIR, `.gitconfig-${configName}`)
  Object.entries(gitConfig).forEach(([k, v]) => {
    if (k.startsWith('includeIf')) {
      const { path } = v
      if (gitConfigPath === path) {
        delete gitConfig[k]
      }
    }
  })
  gitdirs.filter(Boolean).forEach(v => {
    const key = `includeIf "gitdir:${v}"`
    gitConfig[key] = {
      path: gitConfigPath
    }
  })
  writeFileSync(GIT_CONFIG_PATH, ini.stringify(gitConfig))
}

// 获取 git ssh 配置
ipcMain.handle('get-git-ssh-config', event => {
  const gitConfig = parseGitDirs()
  return glob.sync(`${GIT_CONFIG_DIR}/.gitconfig-*`).map(v => {
    const content = readFileSync(v).toString()
    const config = ini.parse(content)
    const configName = v.replace(`${GIT_CONFIG_DIR}/.gitconfig-`, '')
    const sshPubPath = resolve(SSH_CONFIG_DIR, `${configName}.pub`)
    const sshPublicKey = readFileSync(sshPubPath).toString().trim()
    return {
      configName,
      ...config.user,
      sshPublicKey,
      gitdirs: gitConfig[v] || ['']
    }
  })
})

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
  const { configName, hostName, name, email, gitdirs } = config
  const sshConfigPath = resolve(SSH_CONFIG_DIR, 'config')
  const content = readFileSync(sshConfigPath).toString()
  const sshConfig = SSHConfig.parse(content)
  const gitConfigPath = resolve(GIT_CONFIG_DIR, `.gitconfig-${configName}`)
  // 新增
  if (action === 'append') {
    const section = {
      Host: hostName,
      HostName: hostName,
      User: name,
      PreferredAuthentications: 'publickey',
      IdentityFile: resolve(SSH_CONFIG_DIR, configName)
    }
    sshConfig.append(section)
    // git
    const gitConfig = {
      user: {
        hostName,
        name,
        email
      }
    }
    writeFileSync(gitConfigPath, ini.stringify(gitConfig))
  }
  // 删除
  if (action === 'remove') {
    sshConfig.remove({ Host: hostName })
    removeSync(resolve(SSH_CONFIG_DIR, configName))
    removeSync(resolve(SSH_CONFIG_DIR, `${configName}.pub`))
    // git
    removeSync(gitConfigPath)
    updateGitDirs(configName, [])
    return
  }
  // 更新
  if (action === 'update') {
    const section = sshConfig.find({ Host: hostName })
    for (const line of section.config) {
      if (line.param === 'User') {
        line.value = name
      }
    }
    // git
    updateGitDirs(configName, gitdirs)
    const gitConfig = ini.parse(readFileSync(gitConfigPath).toString())
    gitConfig.user.name = name
    gitConfig.user.email = email
    writeFileSync(gitConfigPath, ini.stringify(gitConfig))
  }
  writeFileSync(sshConfigPath, SSHConfig.stringify(sshConfig))
})
