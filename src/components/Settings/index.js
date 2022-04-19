/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 21:14:13
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Typography, Button, Input, Tabs, Radio, message } from 'antd'
import ReactJson from 'react-json-view'
import stripAnsi from 'strip-ansi'
import { setTheme as updateTheme } from '@/utils'
import { ThemeOptions } from './config'

const { Title } = Typography
const { TabPane } = Tabs

const Index = () => {
  const [activeKey, setActiveKey] = useState('appearance')
  const [visible, setVisible] = useState(false)
  const [theme, setTheme] = useState()
  const [prettierConfig, setPrettierConfig] = useState({})
  const [defaultPath, setDefaultPath] = useState()

  useEffect(() => {
    setTheme(ipcRenderer.sendSync('getStore', 'theme'))
    setPrettierConfig(ipcRenderer.sendSync('getStore', 'prettierConfig'))
    setDefaultPath(ipcRenderer.sendSync('getStore', 'defaultPath'))
  }, [setTheme, setPrettierConfig, setDefaultPath])

  useEffect(() => {
    ipcRenderer.on('showSettingsModal', () => {
      setVisible(true)
    })
  }, [setVisible])

  useEffect(() => {
    ipcRenderer.on('native-theme-updated', () => {})
  }, [])

  const getFooter = () => {
    if (activeKey === 'pretter') {
      return
    }
    return null
  }

  const handleChangeTheme = async e => {
    const { value } = e.target
    ipcRenderer.send('changeTheme', value)
    window.localStorage.setItem('theme', value)
    setTheme(value)
    updateTheme()
  }

  const handleConfirm = () => {
    if (activeKey === 'pretter') {
      const { message: msg } = ipcRenderer.sendSync('getPrettierFormatCode', '', prettierConfig)
      if (msg) {
        message.warning('无效配置, 请按提示检查输入')
        message.error(stripAnsi(msg))
        // eslint-disable-next-line
        console.log(msg)
      } else {
        ipcRenderer.send('setStore', 'prettierConfig', prettierConfig)
        setVisible(false)
      }
      return
    }
  }

  const handleSelectDefaultPath = async () => {
    const { canceled, filePaths } = await ipcRenderer.invoke('electron.dialog.showOpenDialog', {
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
      footer={getFooter()}
      width={600}
      destroyOnClose
      bodyStyle={{
        padding: '20px 10px 10px 0',
        minHeight: 200
      }}
      onOk={handleConfirm}
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
        <TabPane tab="Pretter" key="pretter">
          <ReactJson
            src={prettierConfig}
            enableClipboard={false}
            style={{ background: '#fff' }}
            onEdit={({ name, new_value, updated_src }) => {
              const { message: msg } = ipcRenderer.sendSync('getPrettierFormatCode', '', updated_src)
              if (msg) {
                message.error(`${name} = ${new_value}(${typeof new_value}) 不合法`)
                return false
              }
              setPrettierConfig(updated_src)
            }}
          />
        </TabPane>
        <TabPane tab="默认路径" key="defaultPath">
          <Title level={5}>{defaultPath}</Title>
          <Button type="primary" size="small" onClick={handleSelectDefaultPath}>
            浏览
          </Button>
        </TabPane>
      </Tabs>
    </Modal>
  )
}

Index.displayName = 'Settings'

export default Index
