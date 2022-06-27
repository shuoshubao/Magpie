/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-02 23:19:15
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Modal, Collapse, Card, Popconfirm, Tooltip } from 'antd'
import Form from '@ke/form'
import { map } from 'lodash'
import { isEmptyArray } from '@nbfe/tools'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Colors } from '@/configs'
import {
  parseGitDirs,
  getGlobalGitConfigColumns,
  getAddCustomerGitConfigColumns,
  getCustomerGitConfigColumns
} from './config'

const { Panel } = Collapse

export const Index = () => {
  const formRef = useRef()
  const addFormRef = useRef()

  const [GitConfigs, setGitConfigs] = useState([])
  const [visible, setVisible] = useState(false)

  const fetchData = () => {
    const { GIT_CONFIG_DIR, SSH_CONFIG_DIR } = ipcRenderer.sendSync('getMainConfig')
    const gitConfig = parseGitDirs()
    const list = ipcRenderer.sendSync('globSync', `${GIT_CONFIG_DIR}/.gitconfig-*`).map(v => {
      const content = ipcRenderer.sendSync('fs', 'readFileSync', v)
      const config = ipcRenderer.sendSync('ini', 'parse', content)
      const configName = v.replace(`${GIT_CONFIG_DIR}/.gitconfig-`, '')
      const sshPubPath = ipcRenderer.sendSync('path', 'resolve', SSH_CONFIG_DIR, `${configName}.pub`)
      const sshPublicKey = ipcRenderer.sendSync('fs', 'readFileSync', sshPubPath).trim()
      return {
        configName,
        ...config.user,
        sshPublicKey,
        gitdirs: gitConfig[v] || []
      }
    })
    setGitConfigs(list)
  }

  useEffect(() => {
    fetchData()
  }, [setGitConfigs])

  const handleAdd = async () => {
    const formData = await addFormRef.current.getFormData()
    if (!formData) {
      return
    }
    const { configName, hostName, name, email } = formData
    await ipcRenderer.invoke('ssh-keygen', {
      location: configName,
      comment: name
    })
    await ipcRenderer.invoke('ssh-config', 'append', {
      hostName,
      name,
      configName
    })
    message.success('成功新增用户配置!')
    setVisible(false)
    fetchData()
  }

  return (
    <>
      <Form
        ref={formRef}
        columns={getGlobalGitConfigColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Git 全局配置',
          extra: (
            <Button
              type="primary"
              onClick={async () => {
                const formData = await formRef.current.getFormData()
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
                          hostName
                        })
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
                    columns={getCustomerGitConfigColumns({ initialValues: v })}
                    formProps={{ layout: 'horizontal' }}
                    showResetBtn={false}
                  >
                    <Button type="primary" onClick={async () => {}}>
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
