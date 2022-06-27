/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-05-31 17:35:36
 */
import { ipcRenderer } from 'electron'
import { rules } from '@nbfe/tools'

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

export const getCustomerGitConfigColumns = ({ initialValues }) => {
  return [
    {
      label: 'Git服务器域名',
      name: 'hostName',
      template: {
        width: 300
      }
    },
    {
      label: '用户名',
      name: 'name',
      template: {
        width: 300
      }
    },
    {
      label: '邮箱',
      name: 'email',
      template: {
        width: 300
      }
    }
  ].map(v => {
    return {
      ...v,
      defaultValue: initialValues[v.name]
    }
  })
}
