/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 15:04:44
 * @Desc: 路由配置
 */

import React from 'react'
import GitlabOutlined from '@ant-design/icons/GitlabOutlined'
import PictureOutlined from '@ant-design/icons/PictureOutlined'
import { Index, NoMatch } from '@/views/Index'
import Git from '@/views/Git'
import Tinypng from '@/views/Tinypng'

export default [
  {
    name: 'Git管理',
    icon: <GitlabOutlined />,
    path: '/git',
    component: Git
  },
  {
    name: '图片压缩',
    icon: <PictureOutlined />,
    path: '/tinypng',
    component: Tinypng
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
