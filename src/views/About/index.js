/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-29 16:42:05
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Typography } from 'antd'
import CoffeeOutlined from '@ant-design/icons/CoffeeOutlined'
import { Colors } from '@/configs'

const { Title, Text } = Typography

export default () => {
  const { APP_NAME, APP_VERSION } = ipcRenderer.sendSync('getMainConfig')
  return (
    <div style={{ margin: -10, padding: 10, height: 'calc(100% + 20px)', textAlign: 'center' }}>
      <CoffeeOutlined style={{ fontSize: 60, color: Colors.blue }} />
      <Title level={1}>{APP_NAME}</Title>
      <Text>
        版本:
        {APP_VERSION}
      </Text>
    </div>
  )
}
