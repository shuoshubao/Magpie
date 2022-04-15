/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:06:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 18:33:57
 */
import React from 'react'
import { ipcRenderer, shell } from 'electron'
import { Space } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import filesize from 'filesize'

export const Extensions = ['png', 'jpg', 'jpeg', 'webp']

export const columns = [
  {
    title: '缩略图',
    dataIndex: 'base64',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '路径',
    dataIndex: 'path',
    transform: (value, record) => {
      const { filePath, isFile } = record
      const path = isFile ? ipcRenderer.sendSync('getShortPath', value) : value.replace(`${filePath}/`, '')
      return (
        <Space align="center">
          <span>{path} </span>
          <SearchOutlined
            onClick={() => {
              shell.showItemInFolder(value)
            }}
          />
        </Space>
      )
    }
  },
  {
    title: '大小',
    dataIndex: 'size',
    transform: filesize,
    width: 100
  }
]
