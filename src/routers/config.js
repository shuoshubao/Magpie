/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 14:29:19
 * @Desc: 路由配置
 */

import React from 'react'
import GitlabOutlined from '@ant-design/icons/GitlabOutlined'
import { Index, NoMatch } from '@/views/Index'
import Git from '@/views/Git'

export default [
  {
    name: 'Git管理',
    icon: <GitlabOutlined />,
    path: '/git',
    component: Git
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
