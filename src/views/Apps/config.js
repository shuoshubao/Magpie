/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 16:26:12
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 22:11:01
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Typography, Tag } from 'antd'
import { presetPalettes } from '@ant-design/colors'
import Chrome from '@/assets/icns/Chrome.png'
import ChromeChromium from '@/assets/icns/ChromeChromium.png'
import ChromeCanary from '@/assets/icns/ChromeCanary.png'
import Charles from '@/assets/icns/Charles.png'

const { Text } = Typography

export const getAppList = () => {
  return [
    {
      id: 'Google Chrome.app',
      name: 'Google Chrome',
      description: '强大、快速的网页浏览器',
      category: '浏览器',
      icon: Chrome,
      downloadUrl: ''
    },
    {
      id: 'Chromium.app',
      name: 'Google Chrome Chromium',
      description: '强大、快速的网页浏览器',
      category: '浏览器',
      icon: ChromeChromium,
      downloadUrl: ''
    },
    {
      id: 'Google Chrome Canary.app',
      name: 'Google Chrome Canary',
      description: '强大、快速的网页浏览器',
      category: '浏览器',
      icon: ChromeCanary,
      downloadUrl: ''
    },
    {
      id: 'Charles.app',
      name: 'Charles',
      description: '一款强大的网络抓包和网络代理工具，允许开发者查看所有 HTTP 通信信息。',
      category: '网络代理',
      icon: Charles,
      downloadUrl: ''
    }
  ].map(v => {
    const { id } = v
    const appPath = ['/Applications', id].join('/')
    const installed = ipcRenderer.sendSync('fs', 'existsSync', appPath)
    return {
      ...v,
      installed: Number(installed),
      appPath
    }
  })
}

export const getTableColumns = () => {
  return [
    {
      title: 'Icon',
      dataIndex: 'icon',
      template: {
        tpl: 'image'
      }
    },
    {
      title: '信息',
      render: (value, record, index) => {
        const { name, description, category } = record
        const color = presetPalettes[Object.keys(presetPalettes)[index]].primary
        return (
          <div>
            <div>
              <span>{name}</span>
              <Tag color={color} style={{ marginLeft: 4, lineHeight: '14px', fontSize: 11 }}>
                {category}
              </Tag>
            </div>
            <div>{description}</div>
          </div>
        )
      }
    },
    {
      title: '操作',
      width: 80,
      template: {
        tpl: 'link',
        render: (value, record) => {
          const { name, downloadUrl, installed, appPath } = record
          if (installed) {
            return {
              text: '卸载',
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
                  ipcRenderer.sendSync('execaCommandSync', `rm -rf ${appPath}`)
                }
              }
            }
          }
          return {
            text: '去下载',
            path: downloadUrl
          }
        }
      }
    }
  ]
}
