/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 20:48:18
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal } from 'antd'
import Form from '@ke/form'
import Table from '@ke/table'
import { getFormColumns, getTableColumns } from './config'

export const Index = () => {
  const tableRef = useRef()
  const [globalDependencies, setGlobalDependencies] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const { stdout } = ipcRenderer.sendSync('execaCommandSync', 'npm list -g --depth 0 --json')
    const { dependencies } = JSON.parse(stdout)
    const dataSource = Object.entries(dependencies).reduce((prev, [k, v]) => {
      if (k === 'npm') {
        return prev
      }
      const { version, resolved } = v
      const registry = resolved.slice(0, resolved.indexOf('/', 10))
      prev.push({
        name: k,
        version,
        registry
      })
      return prev
    }, [])
    setGlobalDependencies(dataSource)
    tableRef.current.search()
  }, [setGlobalDependencies])

  return (
    <>
      <Form
        columns={getFormColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Node 全局配置'
        }}
      />
      <Table
        ref={tableRef}
        rowKey="name"
        columns={getTableColumns()}
        remoteConfig={{
          fetch: async () => {
            return {
              list: globalDependencies
            }
          }
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
        title="添加依赖"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
        }}
      ></Modal>
    </>
  )
}

Index.displayName = 'NodeJs'

export default Index
