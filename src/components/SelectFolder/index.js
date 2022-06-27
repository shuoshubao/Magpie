import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { Input } from 'antd'
import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'

const Index = props => {
  const { onChange } = props

  const handleSelectFolder = async () => {
    const { canceled, filePaths } = await ipcRenderer.invoke('electron.dialog.showOpenDialog', {
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    }
    const [filePath] = filePaths
    onChange(`${filePath}/`)
  }

  return <Input {...props} suffix={<FolderOpenOutlined onClick={handleSelectFolder} />} />
}

Index.displayName = 'SelectFolder'

export default Index
