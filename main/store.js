/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-17 15:15:22
 * @Desc 配置
 */
const Store = require('electron-store')
const { STORE_CONFIG_NAME } = require('./config')

const store = new Store({
  name: STORE_CONFIG_NAME
})

module.exports = store
