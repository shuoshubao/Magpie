/*
 * @Author: shuoshubao
 * @Date:   2022-04-18 16:20:54
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-19 13:50:20
 */
import { ipcRenderer } from 'electron'
import { convertDataToEnum } from '@nbfe/tools'
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

export const HighlightThemes = [
  'seti-ui',
  'default',
  'dark',
  'github',
  'github-dark',
  'monokai',
  'stackoverflow-dark',
  'stackoverflow-light'
].map(v => {
  return {
    label: v,
    value: ['highlight.js/styles/', v, '.css'].join('')
  }
})

export const getColumns = handleSubmit => {
  return [
    {
      label: '主题',
      name: 'theme',
      defaultValue: HighlightThemes[0].value,
      template: {
        tpl: 'select',
        options: HighlightThemes,
        onChange: value => {
          injectHighlightStyle(value)
        }
      }
    },
    {
      label: '语言',
      name: 'language',
      defaultValue: 'javascript',
      template: {
        tpl: 'select',
        options: convertDataToEnum([
          'javascript',
          'typescript',
          'json',
          'css',
          'less',
          'scss',
          'shell',
          'bash',
          'plaintext'
        ])
      }
    },
    {
      label: '背景色',
      name: 'background',
      defaultValue: 'rgba(171,184,195,1)',
      template: {
        tpl: 'select',
        options: [
          {
            label: '灰色',
            value: 'rgba(171,184,195,1)'
          },
          {
            label: '蓝色',
            value: 'rgba(74,144,226,1)'
          },
          {
            label: '黄色',
            value: 'rgba(248,231,28,1)'
          }
        ]
      }
    },
    {
      label: '标题',
      name: 'title',
      defaultValue: '',
      template: {
        onChange: () => {
          handleSubmit()
        }
      }
    },
    {
      label: 'padding',
      name: 'padding',
      defaultValue: 56,
      template: {
        tpl: 'number'
      }
    },
    {
      label: '宽度',
      name: 'width',
      defaultValue: 800,
      template: {
        tpl: 'number',
        min: 300
      }
    },
    {
      name: 'code',
      defaultValue: "console.log('hello, world')",
      inline: false,
      placeholder: '在此处粘贴代码',
      template: {
        inputType: 'textarea',
        width: '100%',
        onChange: () => {
          handleSubmit()
        },
        rows: 5
      }
    }
  ]
}
