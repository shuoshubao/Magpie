/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:00:05
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 13:52:26
 */
import { dialog } from '@electron/remote'
import { Table } from '@nbfe/components'
import { Button, message } from 'antd'
import { ipcRenderer } from 'electron'
import { last } from 'lodash'
import React, { useRef, useState } from 'react'
import { Extensions, columns } from './config'

export const Index = () => {
  const tableRef = useRef()
  const [dataSource, setDataSource] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  return (
    <div>
      <Table
        ref={tableRef}
        columns={columns}
        rowKey="path"
        pagination={false}
        remoteConfig={{
          fetch: async () => {
            return {
              list: [...dataSource]
            }
          }
        }}
        rowSelection={{
          selectedRowKeys,
          onChange: value => {
            setSelectedRowKeys(value)
          }
        }}
        extraConfig={{
          showTotal: total => {
            return `已选${selectedRowKeys.length}/${total}条数据`
          }
        }}
        scroll={{
          y: 'calc(100vh - 20px - 53px - 43px)'
        }}
        prependHeader={
          <Button
            type="primary"
            onClick={async () => {
              const { canceled, filePaths } = await dialog.showOpenDialog({
                properties: ['openDirectory', 'openFile'],
                filters: [
                  {
                    name: 'Images',
                    extensions: Extensions
                  }
                ]
              })
              if (canceled) {
                message.error('你没有选择文件')
                return
              }
              const time = Date.now()
              const filePath = filePaths[0]
              const isFile = last(filePath.split('/')).includes('.')
              const files = []
              if (isFile) {
                files.push(filePath)
              } else {
                ipcRenderer
                  .sendSync('globSync', [filePath, `**/*.{${Extensions.join(',')}}`].join('/'), {
                    ignore: ['**/node_modules/**', '**/dist/**']
                  })
                  .forEach(v => {
                    files.push(v)
                  })
              }
              message.warning(['获取和读取所有图片耗时: ', Date.now() - time, 'ms'].join(''), 2)
              setSelectedRowKeys(files)
              setDataSource(
                files.map(v => {
                  const { size } = ipcRenderer.sendSync('fs', 'statSync', v)
                  const base64 = ipcRenderer.sendSync('getImageBase64', v)
                  return {
                    filePath,
                    isFile,
                    path: v,
                    size,
                    base64: ['data:image/png;base64,', base64].join('')
                  }
                })
              )
              tableRef.current.search()
            }}
          >
            选择文件夹
          </Button>
        }
        appendHeader={
          <Button type="primary" disabled={!selectedRowKeys.length}>
            开始压缩
          </Button>
        }
      />
    </div>
  )
}

Index.displayName = 'Tinify'

export default Index
