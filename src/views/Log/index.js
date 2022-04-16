/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 23:00:59
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { List, Button, Space, Tooltip, Tag } from 'antd'
import SyncOutlined from '@ant-design/icons/SyncOutlined'
import { LogColors } from '@/configs'

const { LOG_APTH } = ipcRenderer.sendSync('getMainConfig')

export default () => {
  const [LogList, setLogList] = useState([])

  const initData = () => {
    const text = ipcRenderer.sendSync('fs', 'readFileSync', LOG_APTH)
    const list = text
      .split('\n')
      .filter(Boolean)
      .map(v => {
        const [a, b, c, ...d] = v.split(' ')
        const time = [a.slice(1), b.slice(0, -1)].join(' ')
        const type = c.slice(1, -1)
        const text = d.join(' ')
        return {
          time,
          shortTime: time.slice(11, 19),
          type,
          text
        }
      })
    setLogList(list)
  }

  useEffect(() => {
    initData()
  }, [setLogList])

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>运行日志</span>
      <SyncOutlined
        onClick={() => {
          initData()
        }}
      />
    </div>
  )

  const footer = (
    <Button
      type="link"
      size="small"
      onClick={() => {
        shell.showItemInFolder(LOG_APTH)
      }}
    >
      查看日志文件
    </Button>
  )

  return (
    <div style={{ margin: -10, padding: 10, height: 'calc(100% + 20px)' }}>
      <List
        size="small"
        dataSource={LogList.reverse()}
        renderItem={item => {
          const { time, shortTime, type, text } = item
          const color = LogColors[type]
          return (
            <List.Item style={{ padding: '5px 10px' }}>
              <Space>
                <Tooltip title={time}>{shortTime}</Tooltip>
                <Tag color={color}>{type}</Tag>
                <span>{text}</span>
              </Space>
            </List.Item>
          )
        }}
        header={header}
        footer={footer}
      />
    </div>
  )
}
