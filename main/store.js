/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 18:17:34
 * @Desc 配置
 */
const { ipcMain } = require('electron')
const { resolve } = require('path')
const Store = require('electron-store')
const { STORE_CONFIG_NAME, HOME_DIR, prettierConfig } = require('./config')

const store = new Store({
  name: STORE_CONFIG_NAME
})

if (!store.get('theme')) {
  store.set({ theme: 'light' })
}

if (!store.get('prettierConfig')) {
  store.set({ prettierConfig })
}

// 默认路径
if (!store.get('defaultPath')) {
  store.set({
    defaultPath: resolve(HOME_DIR, 'Downloads')
  })
}

ipcMain.on('getStore', (event, name) => {
  event.returnValue = store.get(name)
})

ipcMain.on('setStore', (event, name, value) => {
  store.set({ [name]: value })
})

module.exports = store
