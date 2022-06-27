/*
 * @Author: fangt11
 * @Date:   2022-04-29 14:01:22
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-06 14:45:14
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Space, Typography } from 'antd'
import { sleep } from '@nbfe/tools'
import { RegistryEnum } from '@/configs'

const { Text } = Typography

export const getFormColumns = () => {
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

export const getTableColumns = ({ setModalVisible }) => {
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
      dataIndex: 'version'
    },
    {
      title: '操作',
      template: {
        tpl: 'link',
        render: (value, record) => {
          const { name } = record
          return {
            text: '发布',
            PopconfirmConfig: {
              title: (
                <Space>
                  <span>确定要发布</span>
                  <Text type="success">{name}</Text>
                  <span>吗？</span>
                </Space>
              ),
              onConfirm: async () => {
                await sleep(2)
                setModalVisible(false)
              }
            }
          }
        }
      }
    }
  ]
}
