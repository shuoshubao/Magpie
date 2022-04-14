/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 20:59:52
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 18:33:33
 */
import React, { useRef, useState, useEffect } from 'react'
import Table from '@ke/table'
import { getTableColumns, getAppList } from './config'

export default () => {
  return (
    <Table rowKey="name" columns={getTableColumns()} dataSource={getAppList()} showHeader={false} pagination={false} />
  )
}
