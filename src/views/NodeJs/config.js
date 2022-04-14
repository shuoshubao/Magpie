/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 19:16:44
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import { Modal, Typography, Tooltip, message } from 'antd'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import { rules } from '@nbfe/tools'
import semver from 'semver'
import { RegistryEnum } from '@/configs'

const { required } = rules

const { Text } = Typography

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
        width: 450,
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
        options: RegistryEnum,
        width: 450,
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
      title: 'name',
      dataIndex: 'name',
      render: (value, record) => {
        const { registry } = record
        return (
          <>
            <Text type="success">{value}</Text>
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
                    <Text type="success" style={{ margin: '0 5px' }}>
                      {name}
                    </Text>
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
                    <Text type="danger" style={{ margin: '0 5px' }}>
                      {name}
                    </Text>
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

export const getQueryColumns = () => {
  const npmrc = ipcRenderer.sendSync('getNpmrc')
  return [
    {
      name: 'registry',
      defaultValue: npmrc.registry,
      template: {
        tpl: 'select',
        options: RegistryEnum,
        width: 450,
        optionLabelProp: 'value'
      }
    },
    {
      name: 'name',
      template: {
        inputType: 'search'
      }
    }
  ]
}

export const getQueryTableColumns = () => {
  return [
    {
      title: 'name',
      dataIndex: 'name',
      template: {
        type: 'success'
      }
    },
    {
      title: 'version',
      dataIndex: ['dist-tags', 'latest']
    },
    {
      title: 'description',
      dataIndex: 'description'
    },
    {
      title: 'maintainers',
      dataIndex: 'maintainers'
    },
    {
      title: '操作',
      width: 150,
      template: {
        tpl: 'link',
        render: (value, record) => {
          const { name, readme } = record
          return [
            {
              text: '查看Readme',
              onClick: () => {
                Modal.info({
                  content: <ReactMarkdown children={readme} remarkPlugins={[RemarkGfm]} />,
                  icon: null,
                  width: '90%',
                  style: {
                    top: 20
                  }
                })
              }
            },
            {
              text: '安装',
              PopconfirmConfig: {
                title: (
                  <span>
                    <span>确定要安装</span>
                    <Text type="success" style={{ margin: '0 5px' }}>
                      {name}
                    </Text>
                    <span>吗？</span>
                  </span>
                ),
                onConfirm: async () => {
                  ipcRenderer.sendSync('execaCommandSync', `npm i -g ${name}`)
                }
              }
            }
          ]
        }
      }
    }
  ]
}