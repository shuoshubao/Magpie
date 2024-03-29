/*
 * @Author: shuoshubao
 * @Date:   2022-04-22 15:53:59
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 13:52:25
 * @Desc: 文件上传
 */
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import { dialog } from '@electron/remote'
import { Table } from '@nbfe/components'
import { Button, Typography, message, notification } from 'antd'
import { ipcRenderer } from 'electron'
import { map } from 'lodash'
import React, { useEffect, useRef } from 'react'
import { getTableColumns } from './config'

const { Text } = Typography

const Index = () => {
  const tableRef = useRef()

  useEffect(() => {
    tableRef.current.search()
  }, [])

  const handleSelectProject = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    }
    const [filePath] = filePaths
    const gitExisted = ipcRenderer.sendSync('fs', 'existsSync', [filePath, '.git'].join('/'))
    const packageExisted = ipcRenderer.sendSync('fs', 'existsSync', [filePath, 'package.json'].join('/'))
    if (!gitExisted || !packageExisted) {
      notification.error({
        placement: 'top',
        message: '此目录不是 Git 存储库',
        description: (
          <div>
            <span>请保证所选目录下游</span>
            <Text> .git </Text>
            <span>目录和</span>
            <Text> package.json </Text>
            <span>文件</span>
          </div>
        ),
        style: {
          width: 500
        }
      })
      return
    }
    const projects = ipcRenderer.sendSync('getStore', 'projects')
    if (projects.includes(filePath)) {
      message.error('该项目已添加, 请勿重复操作')
      return
    }
    projects.unshift(filePath)
    ipcRenderer.send('setStore', 'projects', projects)
    tableRef.current.search()
  }

  return (
    <Table
      ref={tableRef}
      rowKey="path"
      columns={getTableColumns()}
      remoteConfig={{
        fetch: async () => {
          const projects = ipcRenderer.sendSync('getStore', 'projects')
          const dataSource = projects
            .filter(v => {
              const gitExisted = ipcRenderer.sendSync('fs', 'existsSync', [v, '.git'].join('/'))
              const packageExisted = ipcRenderer.sendSync('fs', 'existsSync', [v, 'package.json'].join('/'))
              return gitExisted && packageExisted
            })
            .map(v => {
              const pkg = ipcRenderer.sendSync('fs', 'readFileSync', [v, 'package.json'].join('/'))
              return {
                path: v,
                pkg: JSON.parse(pkg)
              }
            })
          return {
            list: dataSource
          }
        }
      }}
      pagination={false}
      prependHeader={
        <Button type="primary" icon={<FolderOpenOutlined />} onClick={handleSelectProject}>
          新增项目
        </Button>
      }
      onDragSortEnd={({ dataSource }) => {
        ipcRenderer.send('setStore', 'projects', map(dataSource, 'path'))
      }}
    />
  )
}

Index.displayName = 'Projects'

export default Index
