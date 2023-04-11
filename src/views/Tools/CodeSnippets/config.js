/*
 * @Author: shuoshubao
 * @Date:   2022-04-21 14:25:58
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:43:22
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'
import { find, cloneDeep } from 'lodash'
import { rules, convertDataToEnum } from '@nbfe/tools'
import hljs from 'highlight.js/lib/core'
import { injectHighlightStyle } from '@/utils/highlight'

const { required } = rules

const ReactHooks = `
import React, { useRef, useState, useEffect } from 'react'

const Index = () => {
  return null
}

Index.displayName = 'Demo'

export default Index
`

const ReactHooksAntd = `
import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'antd'

const Index = () => {
  return <Button type="primary">Button</Button>
}

Index.displayName = 'Demo'

export default Index
`

export const BuiltInDataSource = [
  {
    title: ['React', 'Hooks'],
    language: 'javascript',
    description: 'React + Hooks',
    code: ReactHooks
  },
  {
    title: ['React', 'Hooks', 'Antd'],
    language: 'javascript',
    description: 'React + Hooks + Antd',
    code: ReactHooksAntd
  }
].map(v => {
  return {
    ...v,
    title: v.title.join('_')
  }
})

export const getDataSource = () => {
  const allCodeSnippets = ipcRenderer.sendSync('getGistStore')
  return Object.entries(allCodeSnippets).reduce((prev, [k, v]) => {
    prev.push({
      title: k,
      ...v
    })
    return prev
  }, cloneDeep(BuiltInDataSource))
}

const LanguageList = ['javascript', 'css', 'typescript']

export const PrettierParser = {
  javascript: 'babel',
  css: 'css',
  typescript: 'typescript'
}

export const getTableColumns = ({ setModalData }) => {
  return [
    {
      title: '标题',
      dataIndex: 'title',
      width: 200
    },
    {
      title: '语言',
      dataIndex: 'language',
      width: 100
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '操作',
      dataIndex: 'title',
      width: 160,
      template: {
        tpl: 'link',
        render: (value, record) => {
          const { code, language } = record
          const isBuiltIn = find(BuiltInDataSource, { title: value })
          return [
            {
              text: '查看',
              onClick: () => {
                const { stdout } = ipcRenderer.sendSync('getPrettierFormatCode', code, {
                  parser: PrettierParser[language],
                  semi: false, // 不要分号
                  singleQuote: true // 单引号
                })
                injectHighlightStyle('highlight.js/styles/github-dark.css')
                const { value: highlightCode } = hljs.highlight(stdout, { language })
                Modal.info({
                  title: '代码',
                  content: (
                    <pre>
                      <code className="hljs language-javascript">
                        <div dangerouslySetInnerHTML={{ __html: highlightCode }} />
                      </code>
                    </pre>
                  ),
                  width: '90%',
                  style: {
                    top: 20
                  }
                })
              }
            },
            {
              text: '编辑',
              visible: !isBuiltIn,
              onClick: () => {
                setModalData({
                  visible: true,
                  action: 'edit',
                  data: record
                })
              }
            },
            {
              text: '删除',
              danger: true,
              visible: !isBuiltIn,
              PopconfirmConfig: {
                title: '确定要删除吗？',
                onConfirm: async () => {
                  ipcRenderer.send('deleteGistStore', value)
                }
              }
            }
          ]
        }
      }
    }
  ]
}

export const getFormColumns = ({ initialValues }) => {
  return [
    {
      label: '标题',
      name: 'title',
      rules: [required]
    },
    {
      label: '语言',
      name: 'language',
      defaultValue: LanguageList[0],
      template: {
        tpl: 'select',
        options: convertDataToEnum(LanguageList)
      }
    },
    {
      label: '描述',
      name: 'description',
      rules: [required],
      template: {
        inputType: 'textarea',
        width: 500
      }
    },
    {
      label: '代码',
      name: 'code',
      rules: [required],
      template: {
        inputType: 'textarea',
        width: 500,
        rows: 10
      }
    }
  ].map(v => {
    v.inline = false
    if (initialValues) {
      return {
        ...v,
        defaultValue: initialValues?.[v.name]
      }
    }
    return v
  })
}
