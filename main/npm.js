/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 13:09:24
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-06 18:34:20
 */
const { ipcMain } = require('electron')
const { readFileSync } = require('fs')
const { readJsonSync } = require('fs-extra')
const { resolve } = require('path')
const { sync: globSync } = require('glob')
const ini = require('ini')
const { flatten } = require('lodash')
const { execaCommandSync } = require('./util')
const { NPMRC_PATH } = require('./config')

// 去掉尾部的 /
const formatRegistry = (registry = '') => {
  if (registry.endsWith('/')) {
    return registry.slice(0, -1)
  }
  return registry
}

ipcMain.on('getNpmrc', event => {
  event.returnValue = ini.parse(readFileSync(NPMRC_PATH).toString() || '{}')
})

ipcMain.on('getGlobalDependencies', event => {
  const npmrc = ini.parse(readFileSync(NPMRC_PATH).toString() || '{}')
  const prefix = execaCommandSync('npm config get prefix')

  const globOptions = {
    cwd: prefix,
    ignore: ['**/npm']
  }

  const dependencies = flatten([
    globSync('lib/node_modules/!(@)*', globOptions),
    globSync('lib/node_modules/@*/*', globOptions)
  ]).map(v => {
    const pkg = readJsonSync(resolve(prefix, v, 'package.json'))
    const resolved = pkg._resolved
    const registry = resolved ? resolved.slice(0, resolved.indexOf('/', 10)) : npmrc.registry
    return {
      name: pkg.name,
      version: pkg.version,
      resolved,
      registry: formatRegistry(registry)
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
