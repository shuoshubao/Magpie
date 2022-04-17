/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-18 00:23:06
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'

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
      偏好设置
    </Modal>
  )
}

Index.displayName = 'Settings'

export default Index
