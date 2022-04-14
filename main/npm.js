/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 13:09:24
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 13:22:25
 */
const { ipcMain } = require('electron')
const fs = require('fs')
const ini = require('ini')
const execa = require('execa')
const { execaCommandSync } = require('./util')
const { NPMRC_PATH } = require('./config')

ipcMain.on('getNpmrc', (event, filePath) => {
  const content = fs.readFileSync(NPMRC_PATH).toString()
  event.returnValue = content ? ini.parse(content) : {}
})

// 缓存
const PackageLatestVersions = {}

const getPackageLatestVersion = (name, registry) => {
  const { stdout: latestVersion } = execaCommandSync(`npm view ${name} version --registry=${registry}`)
  PackageLatestVersions[name] = latestVersion
  return latestVersion
}

ipcMain.on('getPackageLatestVersion', (event, name, registry) => {
  event.returnValue = PackageLatestVersions[name] || getPackageLatestVersion(name, registry)
})
