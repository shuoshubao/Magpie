/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 15:12:46
 * @Desc 配置
 */
const { resolve } = require('path')
const os = require('os')
const { app, ipcMain } = require('electron')
const pkg = require('../package.json')
const prettierConfig = require('../prettier.config')

const isDevelopment = process.env.NODE_ENV === 'development'

const APP_NAME = pkg.name

const APP_VERSION = pkg.version

const APP_USERDATA_PATH = app.getPath('userData')

const STORE_CONFIG_NAME = `${APP_NAME}.config`

const CODE_SNIPPETS_STORE_CONFIG_NAME = `${APP_NAME}.CodeSnippets.config`

const KOA_PROT = isDevelopment ? 7598 : 7599

const HOME_DIR = os.homedir()

const APPLICATIONS_DIR = '/Applications'

const LOG_APTH = resolve(HOME_DIR, 'Library/Logs', APP_NAME, 'main.log')

const Chrome_Extensions_PATH = resolve(HOME_DIR, 'Library/ApplicationSupport/Google/Chrome/Default/Extensions')

const Chrome_Extensions_IDS = {
  ReactDevTools: 'fmkadmapgofadopljbjfkapdkoienihi'
}

const NPMRC_PATH = resolve(HOME_DIR, '.npmrc')

const config = {
  pkg,
  APP_NAME,
  APP_VERSION,
  APP_USERDATA_PATH,
  prettierConfig,
  STORE_CONFIG_NAME,
  CODE_SNIPPETS_STORE_CONFIG_NAME,
  isDevelopment,
  KOA_PROT,
  APPLICATIONS_DIR,
  HOME_DIR,
  LOG_APTH,
  Chrome_Extensions_PATH,
  Chrome_Extensions_IDS,
  NPMRC_PATH
}

ipcMain.on('getMainConfig', event => {
  event.returnValue = config
})

module.exports = {
  ...config
}
