/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 19:45:23
 */

import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Card, Result, Button, Typography } from 'antd'
import DesktopOutlined from '@ant-design/icons/DesktopOutlined'
import { Descriptions } from '@ke/table'
import filesize from 'filesize'

const { Text, Title } = Typography

// 首页
const Index = () => {
  const [dataSource1, setDataSource1] = useState()
  const [dataSource2, setDataSource2] = useState()

  const columns1 = [
    {
      label: 'username',
      name: 'username'
    },
    {
      label: 'CPU',
      name: 'cpus'
    },
    {
      label: 'freemem',
      name: 'freemem',
      render: value => {
        return filesize(value || 0)
      }
    },
    {
      label: 'IP',
      name: 'ip'
    },
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
      label: 'Node 版本',
      name: 'node_version'
    },
    {
      label: 'Npm 版本',
      name: 'npm_version'
    }
  ]

  const columns2 = [
    {
      label: 'Electron',
      name: 'electron'
    },
    {
      label: 'Chromium',
      name: 'chrome'
    },
    {
      label: 'Node',
      name: 'node'
    }
  ]

  useEffect(() => {
    const userInfo = ipcRenderer.sendSync('os', 'userInfo')
    const cpus = ipcRenderer.sendSync('os', 'cpus')
    const freemem = ipcRenderer.sendSync('os', 'freemem')
    const { stdout: name } = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.name')
    const { stdout: email } = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.email')
    const { stdout: node_version } = ipcRenderer.sendSync('execaCommandSync', 'node -v')
    const { stdout: npm_version } = ipcRenderer.sendSync('execaCommandSync', 'npm -v')
    setDataSource1({
      username: userInfo.username,
      cpus: cpus.length,
      freemem,
      ip: ipcRenderer.sendSync('getIp'),
      name,
      email,
      node_version: node_version.match(/(\d+(\.\d+)*)/)?.[1],
      npm_version
    })
    setDataSource2(ipcRenderer.sendSync('getProcessVersions'))
  }, [setDataSource1, setDataSource2])

  return (
    <>
      <Card style={{ padding: '100px 0' }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          <DesktopOutlined />
          <span style={{ marginLeft: 10 }}>Magpie</span>
        </Title>
        <Title level={4} style={{ textAlign: 'center' }}>
          前端研发工作台
        </Title>
      </Card>
      <Descriptions title="基本信息" data={dataSource1} columns={columns1} style={{ padding: 10, marginTop: 10 }} />
      <Descriptions title="Electron" data={dataSource2} columns={columns2} style={{ padding: 10, marginTop: 10 }} />
    </>
  )
}

export default Index

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
        <Button type="primary" href="#/">
          去首页
        </Button>
      }
    />
  )
}
