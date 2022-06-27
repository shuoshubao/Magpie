/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-06 15:50:56
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { message } from 'antd'
import { merge, uniqWith, isEqual } from 'lodash'
import { rules, copyText } from '@nbfe/tools'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import SelectFolder from '@/components/SelectFolder'

const { required } = rules

export const getGlobalGitConfigColumns = () => {
  const name = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.name')
  const email = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.email')
  const ignorecase = ipcRenderer.sendSync('execaCommandSync', 'git config --global core.ignorecase') || 'true'

  return [
    {
      label: '用户名',
      name: 'name',
      defaultValue: name,
      rules: [required],
      template: {
        width: 300
      }
    },
    {
      label: '邮箱',
      name: 'email',
      defaultValue: email,
      rules: [
        required,
        {
          type: 'email',
          message: '不是有效的邮箱'
        }
      ],
      template: {
        width: 300
      }
    },
    {
      label: '忽略文件名大小写',
      name: 'ignorecase',
      defaultValue: JSON.parse(ignorecase),
      template: {
        tpl: 'switch'
      }
    }
  ]
}

export const getAddCustomerGitConfigColumns = () => {
  return [
    {
      label: '配置名称',
      name: 'configName',
      rules: [
        required,
        {
          pattern: /^[a-zA-Z]{2,}$/,
          message: '仅支持大小写字母, 且至少2位字符'
        }
      ],
      tooltip: '仅支持大小写字母, 如 Github'
    },
    {
      label: 'Git服务器域名',
      name: 'hostName',
      rules: [
        required,
        {
          type: 'url',
          transform: value => {
            return ['https://', value].join('')
          }
        }
      ],
      tooltip: 'Git服务器域名, 如 github.com'
    },
    {
      label: '用户名',
      name: 'name',
      rules: [required]
    },
    {
      label: '邮箱',
      name: 'email',
      rules: [
        required,
        {
          type: 'email',
          message: '邮箱不合法'
        }
      ]
    }
  ].map(v => {
    return merge(
      {},
      {
        template: {
          width: 300
        }
      },
      v
    )
  })
}

export const getCustomerGitConfigColumns = ({ initialValues }) => {
  return [
    {
      label: 'Git服务器域名',
      name: 'hostName',
      template: {
        disabled: true
      }
    },
    {
      label: '用户名',
      name: 'name',
      rules: [required]
    },
    {
      label: '邮箱',
      name: 'email',
      rules: [required]
    },
    {
      label: 'SSH公钥',
      name: 'sshPublicKey',
      tooltip: '自动生成, 不可手动更改',
      template: {
        suffix: (
          <CopyOutlined
            onClick={() => {
              copyText(initialValues.sshPublicKey)
              message.success('复制成功')
            }}
          />
        ),
        readOnly: true
      }
    },
    {
      label: '目录',
      name: 'gitdirs',
      formListConfig: {
        record: '',
        rules: [
          {
            validator: (rule, value) => {
              if (!isEqual(uniqWith(value, isEqual), value)) {
                return Promise.reject('不能重复')
              }
              return Promise.resolve()
            }
          }
        ]
      },
      template: {
        tpl: SelectFolder,
        readOnly: true,
        allowClear: true
      }
    }
  ].map(v => {
    return merge(
      {},
      {
        defaultValue: initialValues[v.name],
        template: {
          width: 400
        }
      },
      v
    )
  })
}
