/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 13:09:24
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 14:08:24
 */
const { ipcMain, BrowserWindow } = require('electron')
const fs = require('fs')
const ini = require('ini')
const execa = require('execa')
const { execaCommandSync } = require('./util')
const { NPMRC_PATH } = require('./config')

ipcMain.on('getNpmrc', event => {
  const content = fs.readFileSync(NPMRC_PATH).toString()
  event.returnValue = content ? ini.parse(content) : {}
})

// 缓存
const PackageLatestVersions = {}

const getPackageLatestVersion = (name, registry) => {
  if (PackageLatestVersions[name]) {
    return PackageLatestVersions[name]
  }
  const { stdout: latestVersion } = execaCommandSync(`npm view ${name} version --registry=${registry}`)
  PackageLatestVersions[name] = latestVersion
  return latestVersion
}

ipcMain.on('getPackagesLatestVersion', (event, packages) => {
  const list = []
  packages.forEach(v => {
    const { name, registry } = v
    list.push(getPackageLatestVersion(name, registry))
  })

  BrowserWindow.getAllWindows()[0].webContents.send('getPackagesLatestVersion', list)
})
