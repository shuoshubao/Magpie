/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 16:00:48
 */
import React, { useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { List, Button, Tag, Space } from 'antd'
import { LogColors } from '@/configs'

const { LOG_APTH } = ipcRenderer.sendSync('getMainConfig')

export default () => {
  const [LogList, setLogList] = useState([])

  useEffect(() => {
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
          type,
          text
        }
      })
    setLogList(list)
  }, [setLogList])

  const header = (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>运行日志</span>
      <Button
        type="link"
        size="small"
        onClick={() => {
          shell.showItemInFolder(LOG_APTH)
        }}
      >
        查看源文件
      </Button>
    </div>
  )

  return (
    <div style={{ margin: -10, padding: 10, height: 'calc(100% + 20px)' }}>
      <List
        header={header}
        size="small"
        dataSource={LogList}
        renderItem={item => {
          const { time, type, text } = item
          const color = LogColors[type]
          return (
            <List.Item>
              <Space>
                <span>{time}</span>
                <Tag color={color}>{type}</Tag>
                <span>{text}</span>
              </Space>
            </List.Item>
          )
        }}
      ></List>
    </div>
  )
}
