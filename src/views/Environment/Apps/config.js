/*
 * @Author: shuoshubao
 * @Date:   2022-04-14 16:26:12
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:48:39
 */
import Charles from '@/assets/icns/Charles.png'
import Chrome from '@/assets/icns/Chrome.png'
import ChromeCanary from '@/assets/icns/ChromeCanary.png'
import ChromeChromium from '@/assets/icns/ChromeChromium.png'
import DrawIO from '@/assets/icns/DrawIO.png'
import Figma from '@/assets/icns/Figma.png'
import Github from '@/assets/icns/Github.png'
import Jietu from '@/assets/icns/Jietu.png'
import Lemon from '@/assets/icns/Lemon.png'
import MasterGo from '@/assets/icns/MasterGo.png'
import Postman from '@/assets/icns/Postman.png'
import Sketch from '@/assets/icns/Sketch.png'
import Sourcetree from '@/assets/icns/Sourcetree.png'
import SwitchHosts from '@/assets/icns/SwitchHosts.png'
import TencentDocs from '@/assets/icns/TencentDocs.png'
import TencentMeeting from '@/assets/icns/TencentMeeting.png'
import VSCode from '@/assets/icns/VSCode.png'
import XMind from '@/assets/icns/XMind.png'
import Yuque from '@/assets/icns/Yuque.png'
import { presetPalettes } from '@ant-design/colors'
import CloudDownloadOutlined from '@ant-design/icons/CloudDownloadOutlined'
import { Button, Card, Image, Tag, Typography } from 'antd'
import { ipcRenderer, shell } from 'electron'
import { random } from 'lodash'
import React from 'react'

const colors = Object.keys(presetPalettes)

const { Text } = Typography

export const getAppList = () => {
  return [
    {
      id: 'Visual Studio Code.app',
      name: 'VSCode',
      description: '宇宙最强编辑器',
      categories: ['编辑器'],
      icon: VSCode,
      downloadUrl: 'https://code.visualstudio.com/'
    },
    {
      id: 'Google Chrome.app',
      name: 'Google Chrome',
      description: '强大、快速的网页浏览器',
      categories: ['浏览器'],
      icon: Chrome,
      downloadUrl: 'https://www.google.com/intl/zh-CN/chrome/'
    },
    {
      id: 'Chromium.app',
      name: 'Chrome Chromium',
      description: '强大、快速的网页浏览器',
      categories: ['浏览器'],
      icon: ChromeChromium,
      downloadUrl: 'https://download-chromium.appspot.com/'
    },
    {
      id: 'Google Chrome Canary.app',
      name: 'Chrome Canary',
      description: '开发者专用的每日构建版',
      categories: ['浏览器'],
      icon: ChromeCanary,
      downloadUrl: 'https://www.google.com/intl/zh-CN/chrome/canary/'
    },
    {
      id: 'Postman.app',
      name: 'Postman',
      description: 'Api 管理平台',
      categories: ['工具'],
      icon: Postman,
      downloadUrl: 'https://www.postman.com/downloads/'
    },
    {
      id: 'Sketch.app',
      name: 'Sketch',
      description: '原型图',
      categories: ['原型图'],
      icon: Sketch,
      downloadUrl: 'https://www.sketch.com/apps/'
    },
    {
      id: 'Figma.app',
      name: 'Figma',
      description: '原型图',
      categories: ['原型图'],
      icon: Figma,
      downloadUrl: 'https://www.figma.com/downloads/'
    },
    {
      id: 'MasterGo.app',
      name: 'MasterGo',
      description: '原型图',
      categories: ['原型图'],
      icon: MasterGo,
      downloadUrl: 'https://mastergo.com/resource'
    },
    {
      id: 'draw.io.app',
      name: 'draw.io',
      description: '流程图',
      categories: ['流程图'],
      icon: DrawIO,
      downloadUrl: 'https://github.com/jgraph/drawio-desktop/releases/'
    },
    {
      id: 'XMind.app',
      name: 'XMind',
      description: '思维导图',
      categories: ['思维导图'],
      icon: XMind,
      downloadUrl: 'https://xmind.app'
    },
    {
      id: 'Sourcetree.app',
      name: 'Sourcetree',
      description: 'Git 图形化客户端',
      categories: ['Git'],
      icon: Sourcetree,
      downloadUrl: 'https://www.sourcetreeapp.com/'
    },
    {
      id: 'GitHub Desktop.app',
      name: 'GitHub Desktop',
      description: 'Git 图形化客户端',
      categories: ['Git'],
      icon: Github,
      downloadUrl: 'https://desktop.github.com/'
    },
    {
      id: 'SwitchHosts.app',
      name: 'SwitchHosts',
      description: 'host 管理器',
      categories: ['工具'],
      icon: SwitchHosts,
      downloadUrl: 'https://github.com/oldj/SwitchHosts/releases'
    },
    {
      id: 'Charles.app',
      name: 'Charles',
      description: '一款强大的网络抓包和网络代理工具，允许开发者查看所有 HTTP 通信信息。',
      categories: ['网络代理'],
      icon: Charles,
      downloadUrl: 'https://www.charlesproxy.com/download/'
    },
    {
      id: 'Jietu.app',
      name: '腾讯截图',
      description: '截图, 屏幕录制',
      categories: ['腾讯出品', '工具'],
      icon: Jietu,
      downloadUrl: 'https://jietu.qq.com/'
    },
    {
      id: 'Tencent Lemon.app',
      name: '腾讯柠檬',
      description: 'Mac清理工具',
      categories: ['腾讯出品', '工具'],
      icon: Lemon,
      downloadUrl: 'https://lemon.qq.com/'
    },
    {
      id: '腾讯文档.app',
      name: '腾讯文档',
      description: '腾讯文档',
      categories: ['腾讯出品'],
      icon: TencentDocs,
      downloadUrl: 'https://docs.qq.com/home/download/'
    },
    {
      id: 'TencentMeeting.app',
      name: '腾讯会议',
      description: '腾讯会议',
      categories: ['腾讯出品'],
      icon: TencentMeeting,
      downloadUrl: 'https://meeting.tencent.com/download-center.html'
    },
    {
      id: '语雀.app',
      name: '语雀',
      description: '优雅高效的在线文档编辑与协同工具',
      categories: ['阿里出品'],
      icon: Yuque,
      downloadUrl: 'https://www.yuque.com/download'
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
      title: 'Logo',
      dataIndex: 'icon',
      template: {
        tpl: 'image'
      }
    },
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: '分类',
      dataIndex: 'categories',
      render: value => {
        return value.map(v => {
          const color = presetPalettes[colors[random(colors.length - 1)]].primary
          return (
            <Tag key={v} color={color}>
              {v}
            </Tag>
          )
        })
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
                  ipcRenderer.sendSync('execaCommandSync', `rm -rf ${appPath}`)
                }
              }
            }
          }
          return {
            text: '去下载',
            onClick: () => {
              shell.openExternal(downloadUrl)
            }
          }
        }
      }
    }
  ]
}

export const renderItem = item => {
  const { name, icon, downloadUrl, description, categories, installed } = item
  let extraNode
  if (installed) {
    extraNode = <Tag color="success">已安装</Tag>
  } else {
    extraNode = (
      <Button
        size="small"
        danger
        type="primary"
        icon={<CloudDownloadOutlined />}
        onClick={() => {
          shell.openExternal(downloadUrl)
        }}
      >
        去下载
      </Button>
    )
  }
  return (
    <Card title={name} extra={extraNode}>
      <div style={{ display: 'flex' }}>
        <Image style={{ width: 60, height: 60 }} src={icon} />
        <div style={{ paddingLeft: 5 }}>{description}</div>
      </div>
      <div className="ant-card-footer">
        {categories.map((v, i) => {
          const color = presetPalettes[colors[random(colors.length - 1)]].primary
          return (
            <Tag color={color} key={i} style={{ lineHeight: '14px', fontSize: 11 }}>
              {v}
            </Tag>
          )
        })}
      </div>
    </Card>
  )
}
