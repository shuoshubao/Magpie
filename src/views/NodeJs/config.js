/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 20:47:45
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Tooltip, message } from 'antd'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { rules } from '@nbfe/tools'
import { RegistryEnum } from '@/configs'

const { required } = rules

export const getFormColumns = () => {
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

export const getTableColumns = () => {
  return [
    {
      title: 'npm 依赖',
      dataIndex: 'name',
      render: (value, record) => {
        const { registry } = record
        return (
          <>
            <span>{value}</span>
            <Tooltip title={['registry', registry].join(':')} overlayStyle={{ maxWidth: 400 }}>
              <QuestionCircleOutlined style={{ marginLeft: 4, color: '#00000073' }} />
            </Tooltip>
          </>
        )
      }
    },
    {
      title: '当前版本',
      dataIndex: 'version'
    },
    {
      title: '最新版本',
      dataIndex: 'latestVersion'
    },
    {
      title: '操作',
      width: 110,
      template: {
        tpl: 'link',
        render: (value, record) => {
          return [
            {
              text: '升级'
            },
            {
              text: '卸载',
              danger: true
            }
          ]
        }
      }
    }
  ]
}
