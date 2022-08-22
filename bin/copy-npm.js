/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 21:18:10
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 23:05:01
 */
const { copySync } = require('fs-extra')
const { resolve, basename } = require('path')
const glob = require('glob')

const basepath = resolve(__dirname, '../public/npm')

const HighlightFiles = [
  ...glob.sync('node_modules/highlight.js/styles/*.css'),
  ...glob.sync('node_modules/highlight.js/styles/base16/*.css')
]

const HighlightThemes = [
  'seti-ui',
  'default',
  'dark',
  'github',
  'github-dark',
  'monokai',
  'stackoverflow-dark',
  'stackoverflow-light'
]

HighlightFiles.forEach(v => {
  const fileName = basename(v, '.css')
  const to = resolve(basepath, `highlight.js/styles/${fileName}.css`)
  if (HighlightThemes.some(v2 => fileName === v2)) {
    copySync(v, resolve(to))
  }
})

copySync('node_modules/antd/dist/antd.min.css', resolve(basepath, 'antd/dist/antd.min.css'))
copySync('node_modules/antd/dist/antd.dark.min.css', resolve(basepath, 'antd/dist/antd.dark.min.css'))
