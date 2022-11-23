/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 12:52:15
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:49:07
 * @Desc 菜单
 */
const { BrowserWindow, Menu } = require('electron')
const { APP_NAME } = require('./config')
const { createAboutWindow } = require('./window-about')
const { createLogWindow } = require('./window-log')

const template = [
  {
    label: APP_NAME,
    submenu: [
      {
        label: ['关于', APP_NAME].join(' '),
        click: () => {
          createAboutWindow()
        }
      },
      {
        label: '偏好设置',
        accelerator: 'Command+,',
        click: () => {
          BrowserWindow.getAllWindows()[0].webContents.send('showPreferencesModal')
        }
      },
      {
        label: ['退出', APP_NAME].join(' '),
        role: 'quit',
        accelerator: 'Command+Q'
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        role: 'undo',
        accelerator: 'CommandOrControl+Z'
      },
      {
        label: '重做',
        role: 'redo',
        accelerator: 'CommandOrControl+Shift+Z'
      },
      { type: 'separator' },
      {
        label: '剪切',
        role: 'cut',
        accelerator: 'CommandOrControl+X'
      },
      {
        label: '复制',
        role: 'copy',
        accelerator: 'CommandOrControl+C'
      },
      {
        label: '粘贴',
        role: 'paste',
        accelerator: 'CommandOrControl+V'
      },
      {
        label: '选择全部',
        role: 'selectAll',
        accelerator: 'CommandOrControl+A'
      }
    ]
  },
  {
    label: '窗口',
    submenu: [
      {
        label: '关闭',
        role: 'close',
        accelerator: 'CommandOrControl+W'
      },
      {
        label: '刷新',
        role: 'reload',
        accelerator: 'CommandOrControl+R'
      },
      {
        label: '最小化',
        role: 'minimize',
        accelerator: 'CommandOrControl+M'
      },
      {
        label: '缩放',
        role: 'zoom'
      },
      {
        label: '切换全屏',
        role: 'togglefullscreen',
        accelerator: 'Ctrl+Command+F'
      },
      {
        type: 'separator'
      },
      {
        label: '全部置于顶层',
        role: 'front'
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '切换开发人员工具',
        accelerator: 'Alt+Command+I',
        click(item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      },
      {
        label: '查看日志',
        click() {
          createLogWindow()
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(menu)
