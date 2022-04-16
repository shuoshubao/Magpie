/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 15:18:58
 */
const { resolve } = require('path')
const os = require('os')
const { ipcMain } = require('electron')
const pkg = require('../package.json')

const isDevelopment = process.env.NODE_ENV === 'development'

const APP_NAME = pkg.name

const APP_VERSION = pkg.version

const KOA_PROT = isDevelopment ? 7598 : 7599

const APPLICATIONS_DIR = '/Applications'

const HOME_DIR = os.homedir()

const LOG_APTH = resolve(HOME_DIR, 'Library/Logs', APP_NAME, 'main.log')

const NPMRC_PATH = resolve(HOME_DIR, '.npmrc')

const config = {
  pkg,
  APP_NAME,
  APP_VERSION,
  isDevelopment,
  KOA_PROT,
  APPLICATIONS_DIR,
  HOME_DIR,
  LOG_APTH,
  NPMRC_PATH
}

ipcMain.on('getMainConfig', (event, fullPath) => {
  event.returnValue = config
})

module.exports = {
  ...config
}
