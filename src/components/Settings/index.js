/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 13:42:29
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Tabs, Radio } from 'antd'
import { setTheme as updateTheme } from '@/utils'
import { ThemeOptions } from './config'

const { TabPane } = Tabs

const Index = () => {
  const [visible, setVisible] = useState(false)
  const [theme, setTheme] = useState()

  useEffect(() => {
    setTheme(ipcRenderer.sendSync('getTheme'))
    ipcRenderer.on('showSettingsModal', () => {
      setVisible(true)
    })
  }, [setVisible, setTheme])

  ipcRenderer.on('native-theme-updated', () => {})

  const handleChangeTheme = async e => {
    const { value } = e.target
    ipcRenderer.send('changeTheme', value)
    window.localStorage.setItem('theme', value)
    setTheme(value)
    updateTheme()
  }

  if (!theme) {
    return null
  }

  return (
    <Modal
      visible={visible}
      title="偏好设置"
      footer={null}
      onCancel={() => {
        setVisible(false)
      }}
    >
      <Tabs tabPosition="left">
        <TabPane tab="外观" key="appearance" style={{ padding: 20 }}>
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
      </Tabs>
    </Modal>
  )
}

Index.displayName = 'Settings'

export default Index
