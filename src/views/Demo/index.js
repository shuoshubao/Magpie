/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-11 20:07:02
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button } from 'antd'

export const Index = () => {
  return (
    <div style={{ height: '100%', padding: 10, background: '#fff' }}>
      <Button
        type="primary"
        onClick={async () => {
          const { canceled, filePaths } = await ipcRenderer.invoke('showOpenDialog', {
            title: '选择文件',
            properties: ['openFile']
          })
          if (canceled) {
            return
          }
          console.log(filePaths)
          const content = ipcRenderer.sendSync('fs', 'readFileSync', filePaths[0])
          console.log(content)
        }}
      >
        读取文件
      </Button>
    </div>
  )
}

export default Index
