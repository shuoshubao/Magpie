/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 19:56:52
 */
import { ipcRenderer } from 'electron'
import { message } from 'antd'
import { rules } from '@nbfe/tools'
import { RegistryEnum } from '@/configs'

const { required } = rules

export const getColumns = () => {
  const { stdout: version } = ipcRenderer.sendSync('execaCommandSync', 'node -v')
  const npmrc = ipcRenderer.sendSync('getNpmrc')
  return [
    {
      label: 'version',
      name: 'version',
      defaultValue: version,
      rules: [required],
      template: {
        width: 500
      }
    },
    {
      label: 'registry',
      name: 'registry',
      defaultValue: npmrc.registry,
      rules: [required],
      template: {
        tpl: 'select',
        width: 500,
        options: RegistryEnum,
        optionLabelProp: 'value',
        onChange: value => {
          ipcRenderer.sendSync('execaCommandSync', `npm config set registry ${value}`)
          message.success(`registry 已切换至: ${value}`)
        }
      }
    }
  ]
}
