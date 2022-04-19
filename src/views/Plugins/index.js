/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-19 19:54:18
 * @Desc: 插件
 */
import React, { useRef, useState, useEffect } from 'react'
import { Divider } from 'antd'
import Table from '@ke/table'
import ChromeOutlined from '@ant-design/icons/ChromeOutlined'
import SketchOutlined from '@ant-design/icons/SketchOutlined'
import { VSCode } from '@/assets/icons'

export default () => {
  return (
    <>
      <Table
        title={() => {
          return (
            <span>
              <VSCode />
              <span>VSCode 插件</span>
            </span>
          )
        }}
        dataSource={[{ a: 1 }]}
        columns={[{ dataIndex: 'a', title: 'a' }]}
        pagination={false}
      />
      <Table
        title={() => {
          return (
            <span>
              <ChromeOutlined />
              <span>Chrome 插件</span>
            </span>
          )
        }}
        dataSource={[{ a: 1 }]}
        columns={[{ dataIndex: 'a', title: 'a' }]}
        pagination={false}
      />
      <Divider />
      <Table
        title={() => {
          return (
            <span>
              <SketchOutlined />
              <span>Sketch 插件</span>
            </span>
          )
        }}
        dataSource={[{ a: 1 }]}
        columns={[{ dataIndex: 'a', title: 'a' }]}
        pagination={false}
      />
    </>
  )
}
