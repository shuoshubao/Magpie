/*
 * @Author: shuoshubao
 * @Date:   2022-04-07 21:05:13
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 16:49:38
 */
import React, { useRef } from 'react'
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
