/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-08 11:37:08
 * @Desc: 路由配置
 */

import React from 'react'
import BugOutlined from '@ant-design/icons/BugOutlined'
import WechatOutlined from '@ant-design/icons/WechatOutlined'
import MessageOutlined from '@ant-design/icons/MessageOutlined'
import BoxPlotOutlined from '@ant-design/icons/BoxPlotOutlined'
import { Index, NoMatch } from '@/views/Index'
import Demo from '@/views/Demo'

export default [
  {
    name: '示例',
    icon: <BugOutlined />,
    path: '/demo',
    component: Demo
  },
  {
    path: '/',
    component: Index
  },
  // 默认页面
  {
    from: '/',
    to: '/',
    exact: true
  },
  // 404
  {
    path: '*',
    component: NoMatch
  }
]
