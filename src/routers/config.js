/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 21:05:46
 * @Desc: 路由配置
 */

import React from 'react'
import GitlabOutlined from '@ant-design/icons/GitlabOutlined'
import PictureOutlined from '@ant-design/icons/PictureOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'
import Index, { NoMatch } from '@/views/Index'
import Git from '@/views/Git'
import Tinypng from '@/views/Tinypng'
import Apps from '@/views/Apps'
import Browser from '@/views/Browser'

export default [
  {
    name: 'Git管理',
    icon: <GitlabOutlined />,
    path: '/git',
    component: Git
  },
  {
    name: '应用市场',
    icon: <AppstoreOutlined />,
    path: '/apps',
    component: Apps
  },
  {
    name: '浏览器插件',
    icon: <ChromeOutlined />,
    path: '/browser',
    component: Browser
  },
  {
    name: '图片压缩',
    icon: <PictureOutlined />,
    path: '/tinypng',
    component: Tinypng
  },
  {
    path: '/',
    component: Index,
    exact: true
  },
  // 404
  {
    path: '*',
    component: NoMatch
  }
]
