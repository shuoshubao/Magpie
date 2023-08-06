import FolderOpenOutlined from '@ant-design/icons/FolderOpenOutlined'
import { dialog } from '@electron/remote'
import { Input } from 'antd'
import React from 'react'

const Index = props => {
  const { onChange } = props

  const handleSelectFolder = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
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
