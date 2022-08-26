/*
 * @Author: shuoshubao
 * @Date:   2021-11-08 13:35:34
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-06-27 14:03:28
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
    value: 'https://registry.npmmirror.com',
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
