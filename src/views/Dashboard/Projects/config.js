/*
 * @Author: shuoshubao
 * @Date:   2022-04-22 18:26:29
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:48:58
 */
import React from 'react'
import { ipcRenderer, shell } from 'electron'
import { Space, Typography } from 'antd'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import { last, remove } from 'lodash'
import { repositoryUrlStringify } from '@/utils'

const { Link } = Typography

export const getTableColumns = () => {
  return [
    {
      title: '排序',
      width: 60,
      template: {
        tpl: 'sort'
      }
    },
    {
      title: '项目名',
      dataIndex: 'path',
      width: 150,
      render: value => {
        const shortName = last(value.split('/'))
        return (
          <Space>
            <span>{shortName}</span>
            <FolderOpenOutlined
              onClick={() => {
                shell.showItemInFolder(value)
              }}
            />
          </Space>
        )
      }
    },
    {
      title: 'name',
      dataIndex: 'pkg.name',
      width: 150
    },
    {
      title: '描述',
      dataIndex: 'pkg.description',
      width: 150
    },
    {
      title: '项目地址',
      dataIndex: 'pkg.repository.url',
      width: 150,
      transform: repositoryUrlStringify,
      render: value => {
        if (!value) {
          return '--'
        }
        return (
          <Link
            onClick={() => {
              shell.openExternal(value)
            }}
          >
            {value}
          </Link>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'path',
      width: 65,
      template: {
        tpl: 'link',
        render: value => {
          return {
            text: '删除',
            danger: true,
            PopconfirmConfig: {
              title: '确定要删除吗？',
              onConfirm: async () => {
                const projects = ipcRenderer.sendSync('getStore', 'projects')
                remove(projects, v => v === value)
                ipcRenderer.send('setStore', 'projects', projects)
              }
            }
          }
        }
      }
    }
  ]
}
