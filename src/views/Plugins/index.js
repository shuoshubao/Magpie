/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-20 13:48:54
 * @Desc: 插件
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { Divider, List, Card, Button, Tag, Space } from 'antd'
import { last } from 'lodash'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'
import SketchOutlined from '@ant-design/icons/SketchOutlined'
import { VSCode } from '@/assets/icons'
import { ChromeExtensions } from './config'

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
        <List
          rowKey="id"
          grid={{ gutter: 10, column: 4 }}
          dataSource={ChromeExtensionsData}
          renderItem={item => {
            const { title, name, id, icon, homepage, description, installed } = item
            return (
              <List.Item>
                <Card
                  title={
                    <Button
                      type="link"
                      size="small"
                      onClick={() => {
                        shell.openExternal(homepage)
                      }}
                    >
                      {title}
                    </Button>
                  }
                  extra={<Tag color={installed ? 'success' : 'error'}>{installed ? '已安装' : '未安装'}</Tag>}
                >
                  <div style={{ display: 'flex' }}>
                    <img style={{ width: 60, height: 60 }} src={icon} />
                    <div style={{ paddingLeft: 5 }}>{description}</div>
                  </div>
                </Card>
              </List.Item>
            )
          }}
        />
      </Card>
      <Card
        title={
          <Space>
            <VSCode />
            <span>VSCode 插件</span>
          </Space>
        }
      ></Card>
      <Card
        title={
          <Space>
            <SketchOutlined />
            <span>Sketch 插件</span>
          </Space>
        }
      ></Card>
    </>
  )
}
