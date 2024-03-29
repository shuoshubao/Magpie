/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-07 11:20:16
 */
import SelectFolder from '@/components/SelectFolder'
import CopyOutlined from '@ant-design/icons/CopyOutlined'
import { copyText, rules } from '@nbfe/tools'
import { message } from 'antd'
import { ipcRenderer } from 'electron'
import { merge } from 'lodash'
import React from 'react'

const { required, uniq } = rules

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
        rules: [uniq]
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
