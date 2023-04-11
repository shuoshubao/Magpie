/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:43:06
 * @Desc 配置
 */
const { app, ipcMain } = require('electron')
const Store = require('electron-store')
const { APP_USERDATA_PATH, STORE_CONFIG_NAME, GIST_STORE_CONFIG_NAME } = require('./config')

// 用户配置
const appStore = new Store({
  cwd: APP_USERDATA_PATH,
  name: STORE_CONFIG_NAME
})

// 代码片段
const gistStore = new Store({
  cwd: APP_USERDATA_PATH,
  name: GIST_STORE_CONFIG_NAME
})

const defaultStore = {
  theme: 'light', // 主题
  defaultPath: app.getPath('downloads'), // 默认路径
  buckets: [], // bucket 信息存储
  projects: [], // 项目列表
  largeFileLimit: 500 // 大文件行数
}

// 初始化默认值
Object.entries(defaultStore).forEach(([k, v]) => {
  if (appStore.has(k)) {
    return
  }
  appStore.set(k, v)
})

ipcMain.on('getStore', (event, name) => {
  event.returnValue = appStore.get(name)
})

ipcMain.on('setStore', (event, name, value) => {
  appStore.set({ [name]: value })
})

ipcMain.on('getGistStore', (event, name) => {
  event.returnValue = gistStore.get(name)
})

ipcMain.on('setGistStore', (event, name, value) => {
  gistStore.set({ [name]: value })
})

ipcMain.on('deleteGistStore', (event, name) => {
  gistStore.delete(name)
})

module.exports = { appStore, gistStore }
