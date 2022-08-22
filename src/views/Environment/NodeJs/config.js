/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 14:33:27
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-07 10:54:22
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import { Modal, Typography, message } from 'antd'
import { map } from 'lodash'
import { rules, sleep } from '@nbfe/tools'
import { RegistryEnum, RegistryOptions } from '@/configs'

const { required } = rules

const { Text } = Typography

export const getFormColumns = () => {
  const version = ipcRenderer.sendSync('execaCommandSync', 'node -v')
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
        options: RegistryOptions,
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
      dataIndex: 'name'
    },
    {
      title: 'registry',
      dataIndex: 'registry',
      template: {
        tpl: 'enum',
        shape: 'tag',
        options: RegistryEnum
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
          const { name, version, loading, latestVersion } = record
          return [
            {
              text: '升级',
              disabled: latestVersion === version,
              visible: !loading,
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
                  ipcRenderer.send('execaCommandSync', `npm i -g ${name}`)
                  await sleep(2)
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
                  ipcRenderer.send('execaCommandSync', `npm un -g ${name}`)
                  await sleep(2)
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
      placeholder: '请输入 npm 包名',
      template: {
        inputType: 'search'
      }
    }
  ]
}

export const getQueryTableColumns = ({ DependenciesDataSource, setModalVisible, handleSearch, queryFormRef }) => {
  return [
    {
      title: 'name',
      dataIndex: 'name',
      template: {
        type: 'success'
      }
    },
    {
      title: '版本号',
      dataIndex: ['dist-tags', 'latest'],
      width: 65
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '主页',
      dataIndex: 'homepage',
      render: value => {
        return value
      }
    },
    {
      title: '作者',
      dataIndex: 'maintainers',
      transform: value => map(value, 'name'),
      width: 100,
      template: {
        separator: 'div'
      }
    },
    {
      title: '操作',
      width: 150,
      template: {
        tpl: 'link',
        render: (value, record) => {
          const { name, readme } = record
          const installed = DependenciesDataSource.some(v => {
            return v.name === name
          })
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
              disabled: installed,
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
                disabled: installed,
                onConfirm: async () => {
                  const { registry } = await queryFormRef.current.getFormData()
                  ipcRenderer.send('execaCommandSync', `npm i -g ${name} --registry=${registry}`)
                  await sleep(2)
                  setModalVisible(false)
                  handleSearch()
                }
              }
            }
          ]
        }
      }
    }
  ]
}
