/*
 * @Author: shuoshubao
 * @Date:   2022-04-11 14:37:07
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-25 12:20:40
 * @Desc 配置
 */
const { app, ipcMain } = require('electron')
const Store = require('electron-store')
const { STORE_CONFIG_NAME, CODE_SNIPPETS_STORE_CONFIG_NAME, prettierConfig } = require('./config')

const store = new Store({
  name: STORE_CONFIG_NAME
})

const codeSnippetsStore = new Store({
  name: CODE_SNIPPETS_STORE_CONFIG_NAME
})

const defaultStore = {
  theme: 'light', // 主题
  prettierConfig, // prettier配置
  defaultPath: app.getPath('downloads'), // 默认路径
  buckets: [], // bucket 信息存储
  projects: [], // 项目列表
  largeFileLimit: 500 // 大文件行数
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

ipcMain.on('getCodeSnippetsStore', (event, name) => {
  event.returnValue = codeSnippetsStore.get(name)
})

ipcMain.on('getAllCodeSnippetsStore', event => {
  event.returnValue = codeSnippetsStore.store
})

ipcMain.on('setCodeSnippetsStore', (event, name, value) => {
  codeSnippetsStore.set({ [name]: value })
})

ipcMain.on('deleteCodeSnippetsStore', (event, name) => {
  codeSnippetsStore.delete(name)
})

module.exports = store
