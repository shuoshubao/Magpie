/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 14:49:52
 */
import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'antd'
import Form from '@ke/form'
import { getColumns } from './config'

export const Index = () => {
  const formRef = useRef()

  return (
    <div style={{ height: '100%', padding: 10, background: '#fff' }}>
      <Form
        ref={formRef}
        columns={getColumns()}
        formProps={{ layout: 'horizontal' }}
        showResetBtn={false}
        cardProps={{
          title: 'Git全局配置',
          bordered: true,
          extra: (
            <Button
              type="primary"
              onClick={async () => {
                const formData = await formRef.current.getFormData()
                if (!formData) {
                  return
                }
              }}
            >
              保存
            </Button>
          )
        }}
      />
    </div>
  )
}

Index.displayName = 'Git'

export default Index
