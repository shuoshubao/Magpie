/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 20:38:21
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 20:46:33
 */
import filesize from 'filesize'

export const BaseinfoColumns = [
  {
    label: 'CPU',
    name: 'cpus'
  },
  {
    label: 'freemem',
    name: 'freemem',
    render: value => {
      return filesize(value || 0)
    }
  },
  {
    label: 'IP',
    name: 'ip'
  },
  {
    label: '姓名',
    name: 'name'
  },
  {
    label: '邮箱',
    name: 'email',
    span: 2
  },
  {
    label: 'Node 版本',
    name: 'node_version'
  },
  {
    label: 'Npm 版本',
    name: 'npm_version'
  }
]

export const ElectronColumns = [
  {
    label: 'Electron',
    name: 'electron'
  },
  {
    label: 'Chromium',
    name: 'chrome'
  },
  {
    label: 'Node',
    name: 'node'
  }
]
