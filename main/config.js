/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:02:10
 * @Desc 配置
 */
const { existsSync } = require('fs')
const { resolve } = require('path')
const { homedir } = require('os')
const { app, ipcMain } = require('electron')
const pkg = require('../package.json')
const prettierConfig = require('../prettier.config')

const isDevelopment = process.env.NODE_ENV === 'development'

// 应用名称
const APP_NAME = pkg.name

// 应用版本号
const APP_VERSION = pkg.version

// 存储用户数据
const APP_USERDATA_PATH = resolve(app.getPath('userData'), `${APP_NAME}Data`)

// git 配置
const GIT_CONFIG_DIR = resolve(APP_USERDATA_PATH, 'GitConfig')

// Eslint 报告
const ESLINT_REPORT_DIR = resolve(APP_USERDATA_PATH, 'ESLintReport')

// Jscpd 报告
const JSCPD_REPORT_DIR = resolve(APP_USERDATA_PATH, 'JscpdReport')

// 用户配置
const STORE_CONFIG_NAME = `${APP_NAME}.config`

// 代码片段
const GIST_STORE_CONFIG_NAME = 'gist.config'

// KOA端口
const KOA_PROT = isDevelopment ? 7598 : 7599

const HOME_DIR = homedir()

// Mac 应用安装目录
const APPLICATIONS_DIR = '/Applications'

// 日志文件
const LOG_APTH = resolve(HOME_DIR, 'Library/Logs', APP_NAME, 'main.log')

// 更新日志文件
const CHANGELOG_APTH = resolve(__dirname, '../CHANGELOG.md')

// Chrome 插件
let Chrome_Extensions_PATH = resolve(HOME_DIR, 'Library/Application Support/Google/Chrome/Default/Extensions')

if (!existsSync(Chrome_Extensions_PATH)) {
  // Chrome_Extensions_PATH = resolve(HOME_DIR, 'Library/Application Support/Google/Chrome/Profile 1/Extensions')
  Chrome_Extensions_PATH = Chrome_Extensions_PATH.replace('Default', 'Profile 1')
}

// Chrome 插件 id
const Chrome_Extensions_IDS = {
  ReactDevTools: 'fmkadmapgofadopljbjfkapdkoienihi'
}

// .npmrc
const NPMRC_PATH = resolve(HOME_DIR, '.npmrc')

// .gitconfig
const GIT_CONFIG_PATH = resolve(HOME_DIR, '.gitconfig')

// .ssh
const SSH_CONFIG_DIR = resolve(HOME_DIR, '.ssh')

const config = {
  pkg,
  APP_NAME,
  APP_VERSION,
  APP_USERDATA_PATH,
  GIT_CONFIG_DIR,
  ESLINT_REPORT_DIR,
  JSCPD_REPORT_DIR,
  prettierConfig,
  STORE_CONFIG_NAME,
  GIST_STORE_CONFIG_NAME,
  isDevelopment,
  KOA_PROT,
  APPLICATIONS_DIR,
  HOME_DIR,
  LOG_APTH,
  CHANGELOG_APTH,
  Chrome_Extensions_PATH,
  Chrome_Extensions_IDS,
  NPMRC_PATH,
  GIT_CONFIG_PATH,
  SSH_CONFIG_DIR
}

ipcMain.on('getMainConfig', event => {
  event.returnValue = config
})

module.exports = {
  ...config
}
