/*
 * @Author: shuoshubao
 * @Date:   2022-04-21 14:24:16
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 16:10:52
 */
import React, { useRef, useState, useEffect } from 'react'
import { Modal, Button, message } from 'antd'
import { omit } from 'lodash'
import Form from '@ke/form'
import Table from '@ke/table'
import { store, getDataSource, getTableColumns, getFormColumns } from './config'

const Index = () => {
  const tableRef = useRef()
  const formRef = useRef()

  const [modalData, setModalData] = useState({
    visible: false,
    action: ''
  })

  useEffect(() => {
    tableRef.current.search()
  }, [])

  const handleSubmit = async () => {
    const formData = await formRef.current.getFormData()
    if (!formData) {
      return
    }
    const { title } = formData
    if (modalData.action === 'add' && Object.keys(store.store).includes(title)) {
      message.error('标题已存在, 不可新增')
      return
    }
    store.set(title, omit(formData, ['title']))
    setModalData({
      visible: false
    })
    message.success('提交成功')
  }

  return (
    <>
      <Table
        ref={tableRef}
        rowKey="title"
        remoteConfig={{
          fetch: async () => {
            console.log(222)
            return {
              list: getDataSource()
            }
          }
        }}
        columns={getTableColumns()}
        prependHeader={
          <Button
            type="primary"
            onClick={() => {
              setModalData({
                visible: true,
                action: 'add',
                data: {}
              })
            }}
          >
            新增
          </Button>
        }
      />
      <Modal
        title={modalData.action === 'add' ? '新增代码片段' : '编辑代码片段'}
        visible={modalData.visible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalData({
            visible: false
          })
        }}
      >
        <Form ref={formRef} columns={getFormColumns()} showResetBtn={false} />
      </Modal>
    </>
  )
}

Index.displayName = 'CodeSnippets'

export default Index
