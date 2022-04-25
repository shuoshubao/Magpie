/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 13:09:24
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-25 15:03:35
 */
const { ipcMain, BrowserWindow } = require('electron')
const { readFileSync } = require('fs')
const { readJsonSync } = require('fs-extra')
const { resolve, relative } = require('path')
const glob = require('glob')
const ini = require('ini')
const { execaCommandSync } = require('./util')
const { NPMRC_PATH } = require('./config')

ipcMain.on('getNpmrc', event => {
  event.returnValue = ini.parse(readFileSync(NPMRC_PATH).toString() || '{}')
})

ipcMain.on('getGlobalDependencies', event => {
  const npmrc = ini.parse(readFileSync(NPMRC_PATH).toString() || '{}')
  const prefix = execaCommandSync('npm config get prefix')

  const dependencies = glob
    .sync('lib/node_modules/*', {
      cwd: prefix,
      ignore: ['**/npm']
    })
    .map(v => {
      const pkg = readJsonSync(resolve(prefix, v, 'package.json'))
      const resolved = pkg._resolved
      const registry = resolved ? resolved.slice(0, resolved.indexOf('/', 10)) : npmrc.registry
      return {
        name: pkg.name,
        version: pkg.version,
        resolved,
        registry
      }
    })

  event.returnValue = dependencies
})

// 获取 npm 包的公共资源
ipcMain.on('getPublicNpmAssets', (event, filePath) => {
  const basepath = resolve(__dirname, '../public/npm')
  const content = readFileSync(resolve(basepath, filePath)).toString()
  event.returnValue = content
})
