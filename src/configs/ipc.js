/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 15:08:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-21 13:02:16
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Modal, Typography } from 'antd'
import { getAntdLocaleZhCN } from '@nbfe/tools'

const { Text } = Typography

const {
  Text: { copy, copied }
} = getAntdLocaleZhCN()

ipcRenderer.on('showErrorBox', (event, { title, content }) => {
  Modal.error({
    title: (
      <Text
        copyable={{
          tooltips: [copy, copied]
        }}
      >
        {title}
      </Text>
    ),
    content,
    width: '90%',
    style: {
      top: 20
    }
  })
})
