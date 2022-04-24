/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 17:20:25
 * @Desc: 路由配置
 */

import React from 'react'
import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import GitlabOutlined from '@ant-design/icons/GitlabOutlined'
import PictureOutlined from '@ant-design/icons/PictureOutlined'
import CloudUploadOutlined from '@ant-design/icons/CloudUploadOutlined'
import AntDesignOutlined from '@ant-design/icons/AntDesignOutlined'
import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined'
import ControlOutlined from '@ant-design/icons/ControlOutlined'
import ToolOutlined from '@ant-design/icons/ToolOutlined'
import { NodeJs as NodeIcon } from '@/assets/icons'
import Index, { NoMatch } from '@/views/Index'
import About from '@/views/About'
import Log from '@/views/Log'
import DashboardAnalysis from '@/views/Dashboard/Analysis'
import DashboardProjects from '@/views/Dashboard/Projects'
import NodeJs from '@/views/NodeJs'
import Git from '@/views/Git'
import Tinify from '@/views/Tinify'
import S3Upload from '@/views/S3/Upload'
import S3Bucket from '@/views/S3/bucket'
import AntDesignColors from '@/views/AntDesign/Colors'
import AntDesignRecommendation from '@/views/AntDesign/Recommendation'
import ToolsCarbon from '@/views/Tools/Carbon'
import ToolsPlaceholder from '@/views/Tools/Placeholder'
import ToolsCodeSnippets from '@/views/Tools/CodeSnippets'
import Apps from '@/views/Apps'
import Plugins from '@/views/Plugins'

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
    name: '插件',
    icon: <ControlOutlined />,
    path: '/plugins',
    component: Plugins
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
      }
    ]
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
    name: '工具',
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
