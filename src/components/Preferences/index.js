/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-01 16:38:34
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { dialog } from '@electron/remote'
import { Modal, Input, Tabs, Radio } from 'antd'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import { setTheme as updateTheme } from '@/utils'
import { ThemeOptions } from './config'

const { TabPane } = Tabs

const Index = () => {
  const [activeKey, setActiveKey] = useState('appearance')
  const [visible, setVisible] = useState(false)
  const [theme, setTheme] = useState()
  const [defaultPath, setDefaultPath] = useState()

  useEffect(() => {
    setTheme(ipcRenderer.sendSync('getStore', 'theme'))
    setDefaultPath(ipcRenderer.sendSync('getStore', 'defaultPath'))
  }, [setTheme, setDefaultPath])

  useEffect(() => {
    ipcRenderer.on('showPreferencesModal', () => {
      setVisible(true)
    })
  }, [setVisible])

  useEffect(() => {
    ipcRenderer.on('native-theme-updated', () => {})
  }, [])

  const handleChangeTheme = async e => {
    const { value } = e.target
    ipcRenderer.send('changeTheme', value)
    window.localStorage.setItem('theme', value)
    setTheme(value)
    updateTheme()
  }

  const handleSelectDefaultPath = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    }
    const [filePath] = filePaths
    ipcRenderer.send('setStore', 'defaultPath', filePath)
    setDefaultPath(filePath)
  }

  if (!theme) {
    return null
  }

  return (
    <Modal
      visible={visible}
      title="偏好设置"
      footer={null}
      width={600}
      destroyOnClose
      bodyStyle={{
        padding: '20px 10px 10px 0',
        minHeight: 200
      }}
      onCancel={() => {
        setVisible(false)
      }}
    >
      <Tabs tabPosition="left" activeKey={activeKey} onChange={setActiveKey}>
        <TabPane tab="外观" key="appearance">
          <Radio.Group onChange={handleChangeTheme} defaultValue={theme} style={{ width: '100%' }}>
            {ThemeOptions.map(v => {
              const { label, value } = v
              return (
                <Radio.Button value={value} key={value} style={{ display: 'block', height: 50, lineHeight: '50px' }}>
                  {label}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </TabPane>
        <TabPane tab="默认路径" key="defaultPath">
          <Input
            value={defaultPath}
            readOnly
            suffix={<FolderOpenOutlined onClick={handleSelectDefaultPath} />}
            style={{ width: 400 }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

Index.displayName = 'Preferences'

export default Index
