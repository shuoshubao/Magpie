/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:06:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 17:19:25
 */
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import { Space } from 'antd'
import { ipcRenderer, shell } from 'electron'
import filesize from 'filesize'
import React from 'react'

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
      let path
      if (isFile) {
        const { HOME_DIR } = ipcRenderer.sendSync('getMainConfig')
        path = value.replace(HOME_DIR, '~')
      } else {
        path = value.replace(`${filePath}/`, '')
      }
      return (
        <Space align="center">
          <span>{path}</span>
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
