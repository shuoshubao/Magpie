/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 14:37:31
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Tag, Tooltip, message } from 'antd'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { rules } from '@nbfe/tools'
import semver from 'semver'
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
        width: 500,
        disabled: true
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
          const { name, version, latestVersion } = record
          return [
            {
              text: '升级',
              disabled: !semver.lt(version, latestVersion),
              PopconfirmConfig: {
                title: (
                  <span>
                    <span>确定要升级</span>
                    <Tag color="#87d068" style={{ margin: '0 5px' }}>
                      {name}
                    </Tag>
                    <span>吗？</span>
                  </span>
                ),
                onConfirm: async () => {
                  ipcRenderer.sendSync('execaCommandSync', `npm i -g ${name}`)
                }
              }
            },
            {
              text: '卸载',
              danger: true,
              PopconfirmConfig: {
                title: (
                  <span>
                    <span>确定要卸载</span>
                    <Tag color="#f50" style={{ margin: '0 5px' }}>
                      {name}
                    </Tag>
                    <span>吗？</span>
                  </span>
                ),
                onConfirm: async () => {
                  ipcRenderer.sendSync('execaCommandSync', `npm un -g ${name}`)
                }
              }
            }
          ]
        }
      }
    }
  ]
}
