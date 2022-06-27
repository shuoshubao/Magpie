/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-01 23:11:07
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Collapse, Card, Popconfirm, Tooltip } from 'antd'
import Form from '@ke/form'
import { map } from 'lodash'
import { isEmptyArray } from '@nbfe/tools'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { Colors } from '@/configs'
import { parseGitDirs, getGlobalGitConfigColumns, getCustomerGitConfigColumns } from './config'

const { Panel } = Collapse

export const Index = () => {
  const formRef = useRef()

  const [GitConfigs, setGitConfigs] = useState([])

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

  return (
    <>
      <Form
        ref={formRef}
        columns={getGlobalGitConfigColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Git 全局配置',
          size: 'default',
          bordered: true,
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
          <Button type="primary" onClick={() => {}}>
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
                      onConfirm={e => {
                        e.stopPropagation()
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
                    <Button type="primary">保存</Button>
                  </Form>
                </Panel>
              )
            })}
          </Collapse>
        )}
      </Card>
    </>
  )
}

Index.displayName = 'Git'

export default Index
