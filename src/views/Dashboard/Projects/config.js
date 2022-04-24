/*
 * @Author: shuoshubao
 * @Date:   2022-04-22 18:26:29
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 17:14:20
 */
import React from 'react'
import { ipcRenderer, shell } from 'electron'
import { Space, Typography } from 'antd'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import { last } from 'lodash'
import { repositoryUrlStringify } from '@/utils'

const { Text, Link } = Typography

export const getTableColumns = () => {
  return [
    {
      title: '排序',
      width: 50,
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
    }
  ]
}
