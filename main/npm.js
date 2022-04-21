/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 13:09:24
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-19 11:05:33
 */
const { ipcMain, BrowserWindow } = require('electron')
const { readFileSync } = require('fs')
const { resolve } = require('path')
const ini = require('ini')
const execa = require('execa')
const { execaCommandSync } = require('./util')
const { NPMRC_PATH } = require('./config')

ipcMain.on('getNpmrc', event => {
  const content = readFileSync(NPMRC_PATH).toString()
  event.returnValue = content ? ini.parse(content) : {}
})

// 缓存
const PackageLatestVersions = {}

const getPackageLatestVersion = (name, registry) => {
  if (PackageLatestVersions[name]) {
    return PackageLatestVersions[name]
  }
  const latestVersion = execaCommandSync(`npm view ${name} version --registry=${registry}`)
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

const basepath = resolve(__dirname, '../public/npm')

ipcMain.on('getPublicNpmAssets', (event, filePath) => {
  const content = readFileSync(resolve(basepath, filePath)).toString()
  event.returnValue = content
})
