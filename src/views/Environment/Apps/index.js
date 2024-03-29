/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 16:52:55
 */
import { Table } from '@nbfe/components'
import { Card } from 'antd'
import React from 'react'
import { getAppList, getTableColumns, renderItem } from './config'

export default () => {
  return (
    <Card>
      <Table
        rowKey="id"
        dataSource={getAppList()}
        columns={getTableColumns()}
        renderItem={renderItem}
        extraConfig={{
          showViewMode: true,
          defaultViewMode: 'list'
        }}
        listProps={{
          grid: {
            gutter: 10,
            column: 3
          }
        }}
      />
    </Card>
  )
}
