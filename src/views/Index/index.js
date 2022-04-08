/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-03-16 19:49:35
 */

import React from 'react'
import { Result, Button, Typography } from 'antd'

const { Text, Title } = Typography

// 首页
export const Index = () => {
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      <Title level={2}>谛听</Title>
      <Title level={5}>企微接口管理平台</Title>
    </div>
  )
}

// 404
export const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle={
        <Text>
          <div>未找到页面</div>
          <div>请检查页面来源, 建议尝试从左侧菜单进入~</div>
        </Text>
      }
      extra={
        <Button type="primary" href="/">
          去首页
        </Button>
      }
    />
  )
}

// 无权限
export const NoPermission = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle={
        <Text>
          <div>您没有该页面的权限</div>
        </Text>
      }
    />
  )
}
