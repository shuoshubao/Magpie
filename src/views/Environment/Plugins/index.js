/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:54:30
 * @Desc: 插件
 */
import { VSCode } from '@/assets/icons'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'
import { List } from '@nbfe/components'
import { Card, Space } from 'antd'
import { ipcRenderer } from 'electron'
import { last } from 'lodash'
import React, { useEffect, useState } from 'react'
import { ChromeExtensions, renderItem } from './config'

export default () => {
  const [ChromeExtensionsData, setChromeExtensionsData] = useState(ChromeExtensions)

  useEffect(() => {
    const { Chrome_Extensions_PATH } = ipcRenderer.sendSync('getMainConfig')
    const ids = ipcRenderer
      .sendSync('globSync', `${Chrome_Extensions_PATH}/*`)
      .map(v => {
        return last(v.split('/'))
      })
      .filter(v => {
        return v.length === 32
      })
    const temp = ChromeExtensions.map(v => {
      const { id } = v
      return {
        ...v,
        installed: ids.includes(id)
      }
    })
    setChromeExtensionsData(temp)
  }, [])

  return (
    <>
      <Card
        title={
          <Space>
            <ChromeOutlined />
            <span>Chrome 插件</span>
          </Space>
        }
      >
        <List rowKey="id" grid={{ gutter: 10, column: 3 }} dataSource={ChromeExtensionsData} renderItem={renderItem} />
      </Card>
      <Card
        title={
          <Space>
            <VSCode />
            <span>VSCode 插件</span>
          </Space>
        }
      />
    </>
  )
}
