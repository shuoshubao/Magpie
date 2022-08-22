/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:49:26
 */
import React from 'react'
import { Card, Button } from 'antd'

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
