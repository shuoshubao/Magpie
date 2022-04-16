/*
 * @Author: shuoshubao
 * @Date:   2022-04-16 15:08:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 15:09:04
 */
import React from 'react'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'

ipcRenderer.on('showErrorBox', (event, title, content) => {
  Modal.error({
    title,
    content,
    width: '90%',
    style: {
      top: 20
    }
  })
})
