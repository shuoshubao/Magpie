/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 22:57:30
 */
import React, { useRef, useState, useEffect } from 'react'
import { Button } from 'antd'
import Form from '@ke/form'
import { getColumns } from './config'

export const Index = () => {
  const formRef = useRef()

  return (
    <Form
      ref={formRef}
      columns={getColumns()}
      formProps={{ layout: 'horizontal' }}
      showResetBtn={false}
      cardProps={{
        title: 'Git 全局配置',
        size: 'default',
        bordered: true,
        extra: (
          <Button
            type="primary"
            onClick={async () => {
              const formData = await formRef.current.getFormData()
              if (!formData) {
              }
            }}
          >
            保存
          </Button>
        )
      }}
    />
  )
}

Index.displayName = 'Git'

export default Index
