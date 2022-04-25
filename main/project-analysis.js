/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 17:55:38
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-25 14:07:02
 */
const { ipcMain } = require('electron')
const { readFileSync, statSync } = require('fs')
const { extname, resolve } = require('path')
const glob = require('glob')
const { sleep } = require('@nbfe/tools')

ipcMain.handle('project-analysis', async (event, fullPath) => {
  const gitignore = readFileSync(resolve(fullPath, '.gitignore'))
    .toString()
    .split('\n')
    .filter(Boolean)
    .filter(v => !v.includes('#'))
    .map(v => {
      return ['**', v, '**'].join('/')
    })

  const files = glob.sync('**/*.{js,jsx,ts,tsx,vue,css,less,scss,png,jpg,jepg}', {
    cwd: fullPath,
    ignore: [...gitignore, '**/package-lock.json', '**/mock/**', '**/node_modules/**'],
    nodir: true
  })

  return files.map(v => {
    const filePath = resolve(fullPath, v)
    const content = readFileSync(filePath).toString()
    const { size } = statSync(filePath)
    const { length: count } = content
    const { length: lines } = content.split('\n')
    const ext = extname(filePath)
    return {
      filePath: v,
      ext,
      count,
      lines,
      size
    }
  })
})
