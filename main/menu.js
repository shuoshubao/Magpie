/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 12:52:15
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 14:09:28
 */
const { BrowserWindow, Menu, app, shell, dialog } = require('electron')
const log = require('electron-log')
const { APP_NAME, APP_VERSION } = require('./config')
const { createAboutWindow } = require('./window-about')

const template = [
  {
    label: APP_NAME,
    submenu: [
      {
        label: ['关于', APP_NAME].join(' '),
        click: () => {
          createAboutWindow()
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
