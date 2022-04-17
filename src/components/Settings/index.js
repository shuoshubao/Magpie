/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 00:28:42
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Tabs } from 'antd'

const { TabPane } = Tabs

const Index = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    ipcRenderer.on('showSettingsModal', event => {
      setVisible(true)
    })
  }, [setVisible])

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
        <TabPane tab="外观" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </Modal>
  )
}

Index.displayName = 'Settings'

export default Index
