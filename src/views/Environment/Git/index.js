/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-06 14:33:18
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal, Collapse, Card, Popconfirm, Tooltip, message } from 'antd'
import Form from '@ke/form'
import { map, range } from 'lodash'
import { isEmptyArray } from '@nbfe/tools'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Colors } from '@/configs'
import { getGlobalGitConfigColumns, getAddCustomerGitConfigColumns, getCustomerGitConfigColumns } from './config'

const { Panel } = Collapse

export const Index = () => {
  const gitFormRef = useRef()
  const addFormRef = useRef()
  const customerGitConfigRefs = range(10).map(() => {
    return useRef()
  })

  const [GitConfigs, setGitConfigs] = useState([])
  const [visible, setVisible] = useState(false)

  const fetchData = async () => {
    const list = await ipcRenderer.invoke('get-git-ssh-config')
    setGitConfigs(list)
  }

  useEffect(() => {
    fetchData()
  }, [setGitConfigs])

  const handleUpdate = async ({ index, configName, hostName }) => {
    const formData = await customerGitConfigRefs[index].current.getFormData()
    if (!formData) {
      return
    }
    const { name, email, gitdirs } = formData
    await ipcRenderer.invoke('ssh-config', 'update', {
      configName,
      hostName,
      name,
      email
    })
    message.success('更新成功')
  }

  const handleAdd = async () => {
    const formData = await addFormRef.current.getFormData()
    if (!formData) {
      return
    }
    const { configName, hostName, name, email } = formData
    if (map(GitConfigs, 'hostName').includes(hostName)) {
      message.error(`服务器域名${hostName}已存在, 不可重复添加`)
      return
    }
    await ipcRenderer.invoke('ssh-keygen', {
      location: configName,
      comment: name
    })
    await ipcRenderer.invoke('ssh-config', 'append', {
      configName,
      hostName,
      name,
      email
    })
    setVisible(false)
    fetchData()
    message.success('新增成功')
  }

  return (
    <>
      <Form
        ref={gitFormRef}
        columns={getGlobalGitConfigColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Git 全局配置',
          extra: (
            <Button
              type="primary"
              onClick={async () => {
                const formData = await gitFormRef.current.getFormData()
                if (!formData) {
                  return
                }
              }}
            >
              保存
            </Button>
          )
        }}
      />
      <Card
        title="用户配置"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setVisible(true)
            }}
          >
            新增配置
          </Button>
        }
      >
        {!isEmptyArray(GitConfigs) && (
          <Collapse defaultActiveKey={map(GitConfigs, 'configName')}>
            {GitConfigs.map((v, i) => {
              const { configName, hostName, name, email } = v
              return (
                <Panel
                  header={['配置', configName].join('-')}
                  key={configName}
                  extra={
                    <Popconfirm
                      title="确定要删除吗？"
                      placement="topRight"
                      onConfirm={async e => {
                        e.stopPropagation()
                        await ipcRenderer.invoke('ssh-config', 'remove', {
                          configName,
                          hostName
                        })
                        fetchData()
                        message.success('删除成功')
                      }}
                      onCancel={e => {
                        e.stopPropagation()
                      }}
                    >
                      <DeleteOutlined
                        style={{ color: Colors.red }}
                        onClick={e => {
                          e.stopPropagation()
                        }}
                      />
                    </Popconfirm>
                  }
                >
                  <Form
                    ref={customerGitConfigRefs[i]}
                    columns={getCustomerGitConfigColumns({ initialValues: v })}
                    formProps={{ layout: 'horizontal' }}
                    showResetBtn={false}
                  >
                    <Button
                      type="primary"
                      onClick={() => {
                        handleUpdate({ index: i, configName, hostName })
                      }}
                    >
                      保存
                    </Button>
                  </Form>
                </Panel>
              )
            })}
          </Collapse>
        )}
      </Card>
      <Modal
        title="新增用户配置"
        visible={visible}
        destroyOnClose
        onOk={handleAdd}
        onCancel={() => {
          setVisible(false)
        }}
      >
        <Form
          ref={addFormRef}
          columns={getAddCustomerGitConfigColumns()}
          formProps={{ layout: 'horizontal' }}
          showResetBtn={false}
        />
      </Modal>
    </>
  )
}

Index.displayName = 'Git'

export default Index
