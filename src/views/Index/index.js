/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-27 13:52:25
 */

import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Card, Result, Button, Typography } from 'antd'
import CoffeeOutlined from '@ant-design/icons/CoffeeOutlined'
import { Descriptions } from '@nbfe/table'
import ReactMarkdown from 'react-markdown'
import RemarkGfm from 'remark-gfm'
import { BaseinfoColumns, ElectronColumns } from './config'

const { Text, Title } = Typography

// 首页
const Index = () => {
  const [username, setUsername] = useState()
  const [BaseinfoDataSource, setBaseinfoDataSource] = useState({})
  const [ElectronDataSource, setElectronDataSource] = useState({})

  const { APP_NAME } = ipcRenderer.sendSync('getMainConfig')

  useEffect(() => {
    const userInfo = ipcRenderer.sendSync('os', 'userInfo')
    const cpus = ipcRenderer.sendSync('os', 'cpus')
    const freemem = ipcRenderer.sendSync('os', 'freemem')
    const name = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.name')
    const email = ipcRenderer.sendSync('execaCommandSync', 'git config --global user.email')
    const nodeVersion = ipcRenderer.sendSync('execaCommandSync', 'node -v')
    setUsername(userInfo.username)
    setBaseinfoDataSource({
      cpus: cpus.length,
      freemem,
      ip: ipcRenderer.sendSync('getIp'),
      name,
      email,
      nodeVersion
    })
    setElectronDataSource(ipcRenderer.sendSync('getProcessVersions'))
  }, [setUsername, setBaseinfoDataSource, setElectronDataSource])

  const handleOpenChangeLog = () => {
    const ChangelogContent = ipcRenderer.sendSync('fs', 'readFileSync', 'CHANGELOG.md')
    Modal.info({
      content: <ReactMarkdown children={ChangelogContent} remarkPlugins={[RemarkGfm]} />,
      icon: null,
      width: '90%',
      style: {
        top: 20
      }
    })
  }

  if (!username) {
    return null
  }

  const helloText = ['你好, ', username, '!'].join('')

  return (
    <>
      <Card
        style={{ padding: '10px 0' }}
        title={
          <Title level={2} type="success">
            <CoffeeOutlined />
            <span style={{ marginLeft: 10 }}>{APP_NAME}</span>
          </Title>
        }
        extra={
          <Button type="link" onClick={handleOpenChangeLog}>
            更新日志
          </Button>
        }
      >
        <Title level={4}>{helloText}</Title>
      </Card>
      <Descriptions
        title="基本信息"
        data={BaseinfoDataSource}
        columns={BaseinfoColumns}
        style={{ padding: 10, marginTop: 10 }}
      />
      <Descriptions
        title="Electron"
        data={ElectronDataSource}
        columns={ElectronColumns}
        style={{ padding: 10, marginTop: 10 }}
      />
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
