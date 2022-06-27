/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-01 16:19:33
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { message } from 'antd'
import { merge } from 'lodash'
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

export const parseGitDirs = () => {
  const { GIT_CONFIG_PATH } = ipcRenderer.sendSync('getMainConfig')
  const gitConfigContent = ipcRenderer.sendSync('fs', 'readFileSync', GIT_CONFIG_PATH)
  const gitConfig = ipcRenderer.sendSync('ini', 'parse', gitConfigContent)
  return Object.entries(gitConfig).reduce((prev, [k, v]) => {
    if (!k.startsWith('includeIf')) {
      return prev
    }
    const gitdir = k.slice(18, -1)
    const { path } = v
    if (prev[path]) {
      prev[path].push(gitdir)
    } else {
      prev[path] = [gitdir]
    }
    return prev
  }, {})
}

export const getCustomerGitConfigColumns = ({ initialValues }) => {
  return [
    {
      label: 'Git服务器域名',
      name: 'hostName',
      rules: [required]
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
        record: ''
      },
      template: {
        tpl: SelectFolder,
        readOnly: true
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
