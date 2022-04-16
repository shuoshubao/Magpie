/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 12:58:05
 */
const { resolve } = require('path')
const os = require('os')
const pkg = require('../package.json')

const isDevelopment = process.env.NODE_ENV === 'development'

const KOA_PROT = isDevelopment ? 7598 : 7599

const APPLICATIONS_DIR = '/Applications'

const HOME_DIR = os.homedir()

const NPMRC_PATH = resolve(HOME_DIR, '.npmrc')

module.exports = {
  APP_NAME: pkg.name,
  APP_VERSION: pkg.version,
  isDevelopment,
  KOA_PROT,
  APPLICATIONS_DIR,
  HOME_DIR,
  NPMRC_PATH
}
