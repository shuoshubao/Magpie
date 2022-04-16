/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 23:23:18
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-17 00:17:44
 * @Desc 快捷键
 */
const { globalShortcut } = require('electron')
const { createSettingsWindow } = require('./window-settings')

const settings = globalShortcut.register('Command+,', () => {
  createSettingsWindow()
})
