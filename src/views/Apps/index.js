/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 11:14:04
 */
import React, { useRef, useState, useEffect } from 'react'
import { ipcRenderer, shell } from 'electron'
import { List, Card, Button, Tag, Tooltip, Image } from 'antd'
import { presetPalettes } from '@ant-design/colors'
import CloudDownloadOutlined from '@ant-design/icons/CloudDownloadOutlined'
import { random } from 'lodash'
import { getTableColumns, getAppList } from './config'

const colors = Object.keys(presetPalettes)

export default () => {
  return (
    <Card>
      <List
        rowKey="id"
        grid={{ gutter: 10, column: 4 }}
        dataSource={getAppList()}
        renderItem={item => {
          const { name, id, icon, downloadUrl, description, categories, installed } = item
          let extraNode
          if (installed) {
            extraNode = <Tag color="success">已安装</Tag>
          } else {
            extraNode = (
              <Button
                size="small"
                danger
                type="primary"
                icon={<CloudDownloadOutlined />}
                onClick={() => {
                  shell.openExternal(downloadUrl)
                }}
              >
                去下载
              </Button>
            )
          }
          return (
            <List.Item>
              <Card title={name} extra={extraNode}>
                <div style={{ display: 'flex' }}>
                  <Image style={{ width: 60, height: 60 }} src={icon} />
                  <div style={{ paddingLeft: 5 }}>
                    <div>{description}</div>
                  </div>
                </div>
                <div className="ant-card-footer">
                  {categories.map((v, i) => {
                    const color = presetPalettes[colors[random(colors.length - 1)]].primary
                    return (
                      <Tag color={color} key={i} style={{ lineHeight: '14px', fontSize: 11 }}>
                        {v}
                      </Tag>
                    )
                  })}
                </div>
              </Card>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}
