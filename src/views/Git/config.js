/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 14:53:17
 */
import { ipcRenderer } from 'electron'
import { rules } from '@nbfe/tools'

const { required } = rules

export const getColumns = () => {
  const { stdout: name } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'user.name'])
  const { stdout: email } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'user.email'])
  const { stdout: ignorecase } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'core.ignorecase'])
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
