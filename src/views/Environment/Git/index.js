/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-01 11:28:46
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, Collapse, Card } from 'antd'
import Form from '@ke/form'
import { map } from 'lodash'
import { isEmptyArray } from '@nbfe/tools'
import { getGlobalGitConfigColumns, getCustomerGitConfigColumns } from './config'

const { Panel } = Collapse

export const Index = () => {
  const formRef = useRef()

  const [GitConfigs, setGitConfigs] = useState([])

  useEffect(() => {
    const { GIT_CONFIG_DIR, SSH_CONFIG_DIR } = ipcRenderer.sendSync('getMainConfig')
    const list = ipcRenderer.sendSync('globSync', `${GIT_CONFIG_DIR}/.gitconfig-*`).map(v => {
      const content = ipcRenderer.sendSync('fs', 'readFileSync', v)
      const config = ipcRenderer.sendSync('ini', 'parse', content)
      const configName = v.replace(`${GIT_CONFIG_DIR}/.gitconfig-`, '')
      const SshPubPath = ipcRenderer.sendSync('path', 'resolve', SSH_CONFIG_DIR, `${configName}.pub`)
      const sshPublicKey = ipcRenderer.sendSync('fs', 'readFileSync', SshPubPath).trim()
      return {
        configName,
        ...config.user,
        sshPublicKey
      }
    })
    setGitConfigs(list)
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
                <Panel header={['配置', configName].join('-')} key={configName}>
                  <Form
                    columns={getCustomerGitConfigColumns({ initialValues: v })}
                    formProps={{ layout: 'horizontal' }}
                    showResetBtn={false}
                  />
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
