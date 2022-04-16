/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 16:01:18
 * @Desc: 路由配置
 */

import React from 'react'
import GitlabOutlined from '@ant-design/icons/GitlabOutlined'
import PictureOutlined from '@ant-design/icons/PictureOutlined'
import AntDesignOutlined from '@ant-design/icons/AntDesignOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'
import { NodeJs as NodeIcon } from '@/assets/icons'
import Index, { NoMatch } from '@/views/Index'
import About from '@/views/About'
import Log from '@/views/Log'
import NodeJs from '@/views/NodeJs'
import Git from '@/views/Git'
import Tinify from '@/views/Tinify'
import AntDesignColors from '@/views/AntDesign/Colors'
import AntDesignRecommendation from '@/views/AntDesign/Recommendation'
import Apps from '@/views/Apps'
import Browser from '@/views/Browser'

export default [
  {
    name: '关于',
    path: '/about',
    component: About,
    hideNav: true,
    hideSidebar: true
  },
  {
    name: '运行日志',
    path: '/log',
    component: Log,
    hideNav: true,
    hideSidebar: true
  },
  {
    name: 'Node 管理',
    icon: <NodeIcon />,
    path: '/nodejs',
    component: NodeJs
  },
  {
    name: 'Git 管理',
    icon: <GitlabOutlined />,
    path: '/git',
    component: Git
  },
  {
    name: 'App Store',
    icon: <AppstoreOutlined />,
    path: '/apps',
    component: Apps
  },
  {
    name: 'Chrome 插件',
    icon: <ChromeOutlined />,
    path: '/browser',
    component: Browser
  },
  {
    name: '图片压缩',
    icon: <PictureOutlined />,
    path: '/tinify',
    component: Tinify
  },
  {
    name: 'Ant Design',
    icon: <AntDesignOutlined />,
    children: [
      {
        name: '色表盘',
        path: '/ant-design/colors',
        component: AntDesignColors
      },
      {
        name: '社区精选组件',
        path: '/ant-design/recommendation',
        component: AntDesignRecommendation
      }
    ]
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
