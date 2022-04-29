/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-29 15:19:41
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal, Alert, Typography } from 'antd'
import Form from '@ke/form'
import Table from '@ke/table'
import { fetchPkg } from '@/utils'
import { getFormColumns, getTableColumns, getQueryColumns, getQueryTableColumns } from './config'

const { Text } = Typography

export const Index = () => {
  const tableRef = useRef()
  const queryFormRef = useRef()
  const queryTableRef = useRef()
  const [DependenciesDataSource, setDependenciesDataSource] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const fetchDependencies = async () => {
    const dependencies = ipcRenderer.sendSync('getGlobalDependencies')
    const res = await Promise.all(
      dependencies.map(v => {
        const { name, registry } = v
        return fetchPkg({ registry, name })
      })
    )
    dependencies.forEach((v, i) => {
      v.latestVersion = res[i]['dist-tags'].latest
    })
    setDependenciesDataSource(dependencies)
    return {
      list: dependencies
    }
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
        className="mgb10"
      />
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
              const pkg = await fetchPkg({ registry, name })
              return {
                list: [pkg]
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
