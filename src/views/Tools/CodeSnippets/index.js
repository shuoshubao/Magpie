/*
 * @Author: shuoshubao
 * @Date:   2022-04-21 14:24:16
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2023-04-11 22:40:40
 */
import { Form, Table } from '@nbfe/components'
import { Button, Modal, message } from 'antd'
import { ipcRenderer } from 'electron'
import { omit } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { PrettierParser, getDataSource, getFormColumns, getTableColumns } from './config'

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
    const { title, code, language } = formData
    const allCodeSnippets = ipcRenderer.sendSync('getGistStore')
    if (modalData.action === 'add' && Object.keys(allCodeSnippets).includes(title)) {
      message.error('标题已存在, 不可新增')
      return
    }
    const { stderr, stdout } = ipcRenderer.sendSync('getPrettierFormatCode', code, {
      parser: PrettierParser[language],
      semi: false, // 不要分号
      singleQuote: true // 单引号
    })
    if (stderr) {
      message.error('代码有误, 请检查')
      return
    }
    formData.code = stdout
    ipcRenderer.send('setGistStore', title, omit(formData, ['title']))
    setModalData({ visible: false })
    message.success('提交成功')
    tableRef.current.search()
  }

  return (
    <>
      <Table
        ref={tableRef}
        rowKey="title"
        remoteConfig={{
          fetch: async () => {
            return {
              list: getDataSource()
            }
          }
        }}
        columns={getTableColumns({ setModalData })}
        prependHeader={
          <Button
            type="primary"
            onClick={() => {
              setModalData({
                visible: true,
                action: 'add',
                data: null
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
        width={600}
        style={{ top: 20 }}
        destroyOnClose
        onCancel={() => {
          setModalData({ visible: false })
        }}
      >
        <Form ref={formRef} columns={getFormColumns({ initialValues: modalData.data })} showResetBtn={false} />
      </Modal>
    </>
  )
}

Index.displayName = 'CodeSnippets'

export default Index
