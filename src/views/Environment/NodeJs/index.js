/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangtao
 * @Last Modified time: 2023-06-27 18:16:45
 */
import { fetchPkg } from '@/utils'
import { Form, Table } from '@nbfe/components'
import { Alert, Button, Modal, Typography } from 'antd'
import { ipcRenderer } from 'electron'
import React, { useEffect, useRef, useState } from 'react'
import { getFormColumns, getQueryColumns, getQueryTableColumns, getTableColumns } from './config'

const { Paragraph } = Typography

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
          <>
            <Paragraph code copyable>
              sudo chown -R $(whoami) ~/.npm
            </Paragraph>
            <Paragraph code copyable>
              sudo chown -R $(whoami) /usr/local/lib/node_modules
            </Paragraph>
          </>
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
          title: 'Node 全局配置'
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
