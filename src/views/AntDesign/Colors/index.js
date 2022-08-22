/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 13:52:25
 * @Desc 色表盘
 */
import React from 'react'
import { Card, Button } from 'antd'
import Table from '@nbfe/table'
import { columns, dataSource } from './config'
import styles from './index.module.less'

const Index = () => {
  return (
    <Card
      title="Ant Design Colors"
      extra={
        <Button type="link" href="https://ant.design/docs/spec/colors-cn">
          官网
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        showHeader={false}
        className={styles.container}
      />
    </Card>
  )
}

export default Index
