/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 18:02:17
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
  )
}

Index.displayName = 'Git'

export default Index
