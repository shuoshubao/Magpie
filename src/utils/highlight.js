/*
 * @Author: shuoshubao
 * @Date:   2022-04-21 16:40:29
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 16:45:37
 */
import { ipcRenderer } from 'electron'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import json from 'highlight.js/lib/languages/json'
import css from 'highlight.js/lib/languages/css'
import less from 'highlight.js/lib/languages/less'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import bash from 'highlight.js/lib/languages/bash'
import plaintext from 'highlight.js/lib/languages/plaintext'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('css', css)
hljs.registerLanguage('less', less)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('plaintext', plaintext)

// 注入 highlight.js 的主题样式
export const injectHighlightStyle = theme => {
  const cssText = ipcRenderer.sendSync('getPublicNpmAssets', theme)
  const oldThemeNode = document.querySelector('style[data-highlight-theme="true"]')
  if (oldThemeNode) {
    oldThemeNode.innerHTML = cssText
  } else {
    const styleNode = document.createElement('style')
    styleNode.setAttribute('data-highlight-theme', true)
    styleNode.innerHTML = cssText
    document.head.appendChild(styleNode)
  }
}
