/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:00:05
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 17:50:05
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import { Button, message } from 'antd'
import Table from '@ke/table'
import { last, flatten } from 'lodash'
import { sleep } from '@nbfe/tools'
import { columns } from './config'

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
              const { canceled, filePaths } = await ipcRenderer.invoke('showOpenDialog', {
                properties: ['openDirectory', 'openFile', 'multiSelections']
              })
              if (canceled) {
                message.error('你没有选择文件')
                return
              }
              const time = Date.now()
              const patterns = filePaths.map(v => {
                const isFile = last(v.split('/')).includes('.')
                return isFile ? v : `${v}/**/*.{jpg,jpeg,png,webp}`
              })
              const files = flatten(
                patterns.map(v => {
                  return ipcRenderer.sendSync('globSync', v, {
                    ignore: ['**/node_modules/**', '**/dist/**']
                  })
                })
              )
              message.warning(['获取和读取所有图片耗时: ', Date.now() - time, 'ms'].join(''), 2)
              setSelectedRowKeys(files)
              setDataSource(
                files.map(v => {
                  const { size } = ipcRenderer.sendSync('fs', 'statSync', v)
                  const base64 = ipcRenderer.sendSync('getImageBase64', v)
                  return {
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
