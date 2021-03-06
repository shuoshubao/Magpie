/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-29 16:45:04
 * @Desc: 路由配置
 */

import React from 'react'
import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import PictureOutlined from '@ant-design/icons/PictureOutlined'
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined'
import AntDesignOutlined from '@ant-design/icons/AntDesignOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import AppleOutlined from '@ant-design/icons/AppleOutlined'
import Index, { NoMatch } from '@/views/Index'
import About from '@/views/About'
import Log from '@/views/Log'
import DashboardAnalysis from '@/views/Dashboard/Analysis'
import DashboardProjects from '@/views/Dashboard/Projects'
import Tinify from '@/views/Tinify'
import EnvironmentNodeJs from '@/views/Environment/NodeJs'
import EnvironmentGit from '@/views/Environment/Git'
import EnvironmentApps from '@/views/Environment/Apps'
import EnvironmentPlugins from '@/views/Environment/Plugins'
import S3Bucket from '@/views/S3/bucket'
import S3Upload from '@/views/S3/Upload'
import S3Unpkg from '@/views/S3/Unpkg'
import AntDesignColors from '@/views/AntDesign/Colors'
import AntDesignRecommendation from '@/views/AntDesign/Recommendation'
import ToolsCarbon from '@/views/Tools/Carbon'
import ToolsPlaceholder from '@/views/Tools/Placeholder'
import ToolsCodeSnippets from '@/views/Tools/CodeSnippets'

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
    name: '项目看板',
    icon: <DashboardOutlined />,
    children: [
      {
        name: '项目列表',
        path: '/dashboard/projects',
        component: DashboardProjects
      },
      {
        name: '项目分析',
        path: '/dashboard/analysis',
        component: DashboardAnalysis
      }
    ]
  },
  {
    name: '图片压缩',
    icon: <PictureOutlined />,
    path: '/tinify',
    component: Tinify
  },
  {
    name: 'S3服务',
    icon: <CloudUploadOutlined />,
    children: [
      {
        name: 'Bucket',
        path: '/s3/bucket',
        component: S3Bucket
      },
      {
        name: '文件上传',
        path: '/s3/upload',
        component: S3Upload
      },
      {
        name: 'Unpkg',
        path: '/s3/unpkg',
        component: S3Unpkg
      }
    ]
  },
  {
    name: '环境配置',
    icon: <AppleOutlined />,
    children: [
      {
        name: 'Node 管理',
        path: '/environment/nodejs',
        component: EnvironmentNodeJs
      },
      {
        name: 'Git 管理',
        path: '/environment/git',
        component: EnvironmentGit
      },
      {
        name: 'App Store',
        path: '/environment/apps',
        component: EnvironmentApps
      },
      {
        name: '插件',
        path: '/environment/plugins',
        component: EnvironmentPlugins
      }
    ]
  },
  {
    name: 'Ant Design',
    icon: <AntDesignOutlined />,
    hideNav: true,
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
    name: '精品工具',
    icon: <ToolOutlined />,
    children: [
      {
        name: 'Carbon',
        path: '/tools/carbon',
        component: ToolsCarbon
      },
      {
        name: '图片占位符',
        path: '/tools/placeholder',
        component: ToolsPlaceholder
      },
      {
        name: '代码片段',
        path: '/tools/codesnippets',
        component: ToolsCodeSnippets
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
