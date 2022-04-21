/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 17:58:17
 * @Desc 配置
 */
const { app, ipcMain } = require('electron')
const Store = require('electron-store')
const { STORE_CONFIG_NAME, prettierConfig } = require('./config')

const store = new Store({
  name: STORE_CONFIG_NAME
})

const defaultStore = {
  theme: 'light', // 主题
  prettierConfig, // prettier配置
  defaultPath: app.getPath('downloads') // 默认路径
}

// 初始化默认值
Object.entries(defaultStore).forEach(([k, v]) => {
  if (store.has(k)) {
    return
  }
  store.set(k, v)
})

ipcMain.on('getStore', (event, name) => {
  event.returnValue = store.get(name)
})

ipcMain.on('setStore', (event, name, value) => {
  store.set({ [name]: value })
})

module.exports = store
