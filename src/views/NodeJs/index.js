/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 22:59:56
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal } from 'antd'
import Form from '@ke/form'
import Table from '@ke/table'
import { getFormColumns, getTableColumns, getQueryColumns, getQueryTableColumns } from './config'

export const Index = () => {
  const tableRef = useRef()
  const queryTableRef = useRef()
  const [modalVisible, setModalVisible] = useState(false)

  const fetchDependencies = async () => {
    const { stdout } = ipcRenderer.sendSync('execaCommandSync', 'npm list -g --depth 0 --json')
    const { dependencies } = JSON.parse(stdout)
    const dataSource = Object.entries(dependencies).reduce((prev, [name, v]) => {
      if (name === 'npm') {
        return prev
      }
      const { version, resolved } = v
      const registry = resolved.slice(0, resolved.indexOf('/', 10))
      const latestVersion = ipcRenderer.sendSync('getPackageLatestVersion', name, registry)
      prev.push({
        name,
        version,
        registry,
        latestVersion
      })
      return prev
    }, [])
    return {
      list: dataSource
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
        <Form columns={getQueryColumns()} onSubmit={handleSearch} showResetBtn={false} />
        <Table
          ref={queryTableRef}
          rowKey="name"
          columns={getQueryTableColumns()}
          remoteConfig={{
            fetch: async params => {
              const { name, registry } = params
              if (!name) {
                return {
                  list: []
                }
              }
              const { stderr, stdout } = ipcRenderer.sendSync(
                'execaCommandSync',
                `npm view ${name} name dist-tags maintainers description readme --json --registry=${registry}`
              )
              if (stderr) {
                return {
                  list: []
                }
              }
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
