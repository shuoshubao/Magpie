/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 18:39:14
 * @Desc 配置
 */
const { app, ipcMain } = require('electron')
const Store = require('electron-store')
const { STORE_CONFIG_NAME, prettierConfig } = require('./config')

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
    defaultPath: app.getPath('downloads')
  })
}

ipcMain.on('getStore', (event, name) => {
  event.returnValue = store.get(name)
})

ipcMain.on('setStore', (event, name, value) => {
  store.set({ [name]: value })
})

module.exports = store
