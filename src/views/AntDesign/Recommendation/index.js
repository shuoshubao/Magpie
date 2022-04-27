/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 20:29:50
 */
import React from 'react'
import { Card, Button } from 'antd'
import Table from '@ke/table'
// import { columns, dataSource } from './config'

const Index = () => {
  return (
    <Card
      title="社区精选组件"
      extra={
        <Button type="link" href="https://ant.design/docs/react/recommendation-cn">
          官网
        </Button>
      }
    />
  )
}

export default Index
