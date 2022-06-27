/*
 * @Author: fangt11
 * @Date:   2021-11-08 13:35:34
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-07 10:50:46
 */
import React from 'react'
import { Tag } from 'antd'

// registry
export const RegistryEnum = [
  {
    value: 'https://registry.npmjs.org',
    label: 'NPM',
    color: '#231f20'
  },
  {
    value: 'http://artifactory.ke.com/artifactory/api/npm/npm-virtual/',
    label: '贝壳',
    color: '#3072f6'
  },
  {
    value: 'https://registry.npm.taobao.org',
    label: '阿里',
    color: '#ff5000'
  },
  {
    value: 'http://r.npm.sankuai.com',
    label: '美团',
    color: '#ffc300'
  }
]

export const RegistryOptions = RegistryEnum.map(v => {
  const { value, label, color } = v
  return {
    ...v,
    label: (
      <div key={value} style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span key="1">{value}</span>
        <Tag key="2" color={color}>
          {label}
        </Tag>
      </div>
    )
  }
})
