/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 20:29:44
 */
const os = require('os')

const isDevelopment = process.env.NODE_ENV === 'development'

const KOA_PROT = isDevelopment ? 7598 : 7599

const APPLICATIONS_DIR = '/Applications'

const HOME_DIR = os.homedir()

module.exports = {
  isDevelopment,
  KOA_PROT,
  APPLICATIONS_DIR,
  HOME_DIR
}
