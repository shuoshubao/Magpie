/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-22 14:25:42
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal, Alert, Typography, Divider } from 'antd'
import Form from '@ke/form'
import Table from '@ke/table'
import { getFormColumns, getTableColumns, getQueryColumns, getQueryTableColumns } from './config'

const { Text } = Typography

export const Index = () => {
  const tableRef = useRef()
  const queryFormRef = useRef()
  const queryTableRef = useRef()
  const [DependenciesDataSource, setDependenciesDataSource] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const fetchDependencies = () => {
    const npmrc = ipcRenderer.sendSync('getNpmrc')
    return new Promise((resolve, reject) => {
      const res = ipcRenderer.sendSync('execaCommandSync', 'npm list -g --depth 0 --json')
      const { dependencies } = JSON.parse(res)
      const dataSource = Object.entries(dependencies).reduce((prev, [name, v]) => {
        if (name === 'npm') {
          return prev
        }
        const { version, resolved } = v
        const registry = resolved ? resolved.slice(0, resolved.indexOf('/', 10)) : npmrc.registry
        prev.push({
          name,
          version,
          registry,
          latestVersion: ''
        })
        return prev
      }, [])
      ipcRenderer.send('getPackagesLatestVersion', dataSource)
      ipcRenderer.on('getPackagesLatestVersion', (event, list) => {
        dataSource.forEach((v, i) => {
          v.latestVersion = list[i]
        })
        setDependenciesDataSource(dataSource)
        resolve({
          list: dataSource
        })
      })
    })
  }

  useEffect(() => {
    tableRef.current.search()
  }, [])

  const handleSearch = params => {
    queryTableRef.current.search(params)
  }

  return (
    <>
      <Alert
        message="请确保有 npm install --global 的权限, 如果没有权限请在命令行执行以下代码"
        description={
          <Text code copyable>
            sudo chown -R $(whoami) ~/.npm
          </Text>
        }
        type="warning"
        closable
        showIcon
      />
      <Divider />
      <Form
        columns={getFormColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Node 全局配置',
          size: 'default'
        }}
        autoSubmit={false}
      />
      <Table
        ref={tableRef}
        rowKey="name"
        columns={getTableColumns()}
        remoteConfig={{
          fetch: fetchDependencies
        }}
        extraConfig={{ showTotal: true }}
        pagination={false}
        appendHeader={
          <Button
            type="primary"
            onClick={() => {
              setModalVisible(true)
            }}
          >
            添加依赖
          </Button>
        }
      />
      <Modal
        title="安装全局依赖"
        visible={modalVisible}
        width="90%"
        onCancel={() => {
          setModalVisible(false)
        }}
        destroyOnClose
        footer={null}
      >
        <Form ref={queryFormRef} columns={getQueryColumns()} onSubmit={handleSearch} showResetBtn={false} />
        <Table
          ref={queryTableRef}
          rowKey="name"
          columns={getQueryTableColumns({ DependenciesDataSource, setModalVisible, handleSearch, queryFormRef })}
          remoteConfig={{
            fetch: async params => {
              const { name, registry } = params
              if (!name) {
                return {
                  list: []
                }
              }
              const stdout = ipcRenderer.sendSync(
                'execaCommandSync',
                `npm view ${name} name dist-tags maintainers description readme --json --registry=${registry}`
              )
              const list = [JSON.parse(stdout)]
              return {
                list
              }
            }
          }}
          pagination={false}
        />
      </Modal>
    </>
  )
}

Index.displayName = 'NodeJs'

export default Index
