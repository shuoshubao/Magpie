/*
 * @Author: shuoshubao
 * @Date:   2022-04-15 14:55:02
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 16:35:29
 */
import React from 'react'
import { Card, Button } from 'antd'
import Table from '@ke/table'
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
