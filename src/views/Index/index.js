/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-08 18:43:00
 */

import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Result, Button, Typography, Descriptions } from 'antd'
import { get } from 'lodash'
// import { Descriptions } from '@ke/table'

const { Text, Title } = Typography

// 首页
export const Index = () => {
  const columns = [
    {
      label: '姓名',
      name: 'name'
    },
    {
      label: '邮箱',
      name: 'email',
      span: 2
    },
    {
      label: 'Node版本',
      name: 'node_version'
    },
    {
      label: 'Npm版本',
      name: 'npm_version'
    }
  ]

  const { stdout: name } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'user.name'])
  const { stdout: email } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'user.email'])
  const { stdout: node_version } = ipcRenderer.sendSync('execaSync', 'node', ['-v'])
  const { stdout: npm_version } = ipcRenderer.sendSync('execaSync', 'npm', ['-v'])

  const dataSource = {
    name,
    email,
    node_version,
    npm_version
  }

  return (
    <div style={{ height: '100%', padding: '100px 10px 10px', background: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Magpie
      </Title>
      <Title level={5} style={{ textAlign: 'center' }}>
        一站式研发工作台
      </Title>
      <Descriptions title="基本信息" className="mgt30">
        {columns.map(v => {
          const { label, name, ...resetProps } = v
          return (
            <Descriptions.Item label={label} {...resetProps}>
              {get(dataSource, name)}
            </Descriptions.Item>
          )
        })}
      </Descriptions>
    </div>
  )
}

// 404
export const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Text>
          <div>未找到页面</div>
          <div>请检查页面来源, 建议尝试从左侧菜单进入~</div>
        </Text>
      }
      extra={
        <Button type="primary" href="/">
          去首页
        </Button>
      }
    />
  )
}

// 无权限
export const NoPermission = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle={
        <Text>
          <div>您没有该页面的权限</div>
        </Text>
      }
    />
  )
}
