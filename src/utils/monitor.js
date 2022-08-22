/*
 * @Author: shuoshubao
 * @Date:   2021-07-23 12:06:57
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 16:06:04
 * @Desc: 错误监控
 */

import React from 'react'
import { Modal, Descriptions, List, Typography } from 'antd'

const { Text } = Typography

const getErrorStackNode = (stack = '') => {
  if (!stack) {
    return null
  }
  const stackArr = stack.split('\n')
  return (
    <List
      size="small"
      header={<Text type="danger">{stackArr[0]}</Text>}
      bordered
      dataSource={stackArr.slice(1)}
      renderItem={item => {
        const itemText = item.trim()
        const text = itemText.split('at ')[1]
        let contentNode
        if ((text || '').includes('(')) {
          const startIndex = text.indexOf('(')
          const endIndex = text.indexOf(')')
          const pathText = text.slice(startIndex + 1, endIndex)
          contentNode = [
            <Text type="danger" key="1">
              {text.slice(0, startIndex + 1)}
            </Text>,
            pathText.includes('//') ? (
              <span key="2">{pathText}</span>
            ) : (
              <Text key="2" type="danger">
                {pathText}
              </Text>
            ),
            <Text type="danger" key="3">
              {text.slice(endIndex)}
            </Text>
          ]
        } else {
          contentNode = <span>{text}</span>
        }
        return (
          <List.Item style={{ border: 0, padding: '0 16px 0 30px' }}>
            <div style={{ whiteSpace: 'nowrap' }}>
              <Text type="danger">at </Text>
              {contentNode}
            </div>
          </List.Item>
        )
      }}
    />
  )
}

window.addEventListener('error', e => {
  const { message, lineno, colno, filename, error } = e
  if (!error) {
    // eslint-disable-next-line no-console
    console.log(
      '%c%s',
      'color: #fff; background: #ff4d4f; font-size: 16px; padding: 2px 5px; line-height: 20px;',
      '错误信息:'
    )
    // eslint-disable-next-line no-console
    console.log('%c%s', 'color: cyan;', message)
    return
  }
  const { stack } = error
  Modal.error({
    title: ['JS报错', 'error', window.location.href].join(' _ '),
    width: '90%',
    okText: '知道了',
    content: (
      <Descriptions column={1} size="small">
        <Descriptions.Item label="错误信息">
          <Text copyable={{ tooltips: '复制' }}>{message}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="出错文件">
          <Text copyable={{ tooltips: '复制' }}>{filename}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="出错位置">
          <Text copyable={{ tooltips: '复制' }}>{[lineno, colno].join(':')}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="错误详情">
          <div style={{ width: 800, maxHeight: 500, overflow: 'auto' }}>{getErrorStackNode(stack)}</div>
        </Descriptions.Item>
      </Descriptions>
    )
  })
})

window.addEventListener('unhandledrejection', e => {
  const {
    reason: { stack }
  } = e
  if (!stack) {
    return
  }
  Modal.error({
    title: ['JS报错', 'unhandledrejection', window.location.href].join(' _ '),
    width: '90%',
    okText: '知道了',
    content: getErrorStackNode(stack)
  })
})
