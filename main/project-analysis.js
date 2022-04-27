/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 17:55:38
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 17:51:32
 */
const { ipcMain } = require('electron')
const { readFileSync, writeFileSync, statSync } = require('fs')
const { ensureFileSync, writeJsonSync } = require('fs-extra')
const { basename, extname, resolve } = require('path')
const glob = require('glob')
const { ESLint } = require('eslint')
const { ESLINT_REPORT_DIR } = require('./config')

const getProjectFiles = (fullPath, extensions = []) => {
  const gitignore = readFileSync(resolve(fullPath, '.gitignore'))
    .toString()
    .split('\n')
    .filter(Boolean)
    .filter(v => !v.includes('#'))
    .map(v => {
      return ['**', v, '**'].join('/')
    })

  return glob.sync(`**/*.{${extensions.join(',')}}`, {
    cwd: fullPath,
    ignore: [...gitignore, '**/package-lock.json', '**/mock/**', '**/node_modules/**'],
    nodir: true
  })
}

ipcMain.handle('getProjectAnalysis', (event, fullPath) => {
  const files = getProjectFiles(fullPath, [
    'js',
    'jsx',
    'ts',
    'tsx',
    'vue',
    'css',
    'less',
    'scss',
    'png',
    'jpg',
    'jpeg'
  ])
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

ipcMain.handle('getEslintResults', async (event, fullPath) => {
  const files = getProjectFiles(fullPath, ['js', 'jsx', 'ts', 'tsx'])

  const eslint = new ESLint({
    cwd: fullPath,
    resolvePluginsRelativeTo: '.'
  })

  try {
    const results = await eslint.lintFiles(
      files.map(v => {
        return resolve(fullPath, v)
      })
    )

    const rulesMeta = eslint.getRulesMetaForResults(results)

    const formatter = await eslint.loadFormatter('html')
    const html = formatter.format(results)

    const time = Date.now()

    const EslintReportDir = resolve(ESLINT_REPORT_DIR, basename(fullPath))

    const htmlPath = `${[EslintReportDir, time].join('/')}.html`
    const jsonPath = `${[EslintReportDir, time].join('/')}.json`

    const data = { results, rulesMeta, EslintReportFilePath: htmlPath }

    ensureFileSync(htmlPath)
    writeFileSync(htmlPath, html.replaceAll('../', '').replaceAll(fullPath, ''))
    ensureFileSync(jsonPath)
    writeJsonSync(jsonPath, data)

    return data
  } catch (e) {
    return {
      errMsg: e.message
    }
  }
})
