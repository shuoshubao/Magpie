/*
 * @Author: shuoshubao
 * @Date:   2022-04-22 18:26:29
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 14:30:35
 */
import { ipcRenderer } from 'electron'
import { merge, remove } from 'lodash'
import { rules } from '@nbfe/tools'

const { required } = rules

export const TestBucketInfo = {
  bucket: 'test',
  description: '公共test桶, 仅供测试使用',
  accessKeyId: 'LV56XXCKXJ4VW7X4K2GA',
  secretAccessKey: 'ZF04UHDP7erVckdkZWNlZ6bFwu2mte3dNi9aFhz7'
}

export const getTableColumns = ({ setModalData }) => {
  return [
    {
      title: 'bucket',
      dataIndex: 'bucket'
    },
    {
      title: '描述',
      dataIndex: 'description'
    },
    {
      title: 'accessdKeyId',
      dataIndex: 'accessKeyId'
    },
    {
      title: 'secretAdccessKey',
      dataIndex: 'secretAccessKey'
    },
    {
      title: '操作',
      dataIndex: 'bucket',
      template: {
        tpl: 'link',
        render: (value, record) => {
          const isTestBucket = value === TestBucketInfo.bucket
          return [
            {
              text: '编辑',
              disabled: isTestBucket,
              onClick: () => {
                setModalData({ visible: true, action: 'edit', data: record })
              }
            },
            {
              text: '删除',
              disabled: isTestBucket,
              PopconfirmConfig: {
                title: '确定要删除吗？',
                onConfirm: async () => {
                  const buckets = ipcRenderer.sendSync('getStore', 'buckets')
                  remove(buckets, v => v.bucket === value)
                  ipcRenderer.send('setStore', 'buckets', buckets)
                }
              }
            }
          ]
        }
      }
    }
  ]
}

export const getFormColumns = ({ initialValues }) => {
  const isEdit = !initialValues
  return [
    {
      label: 'bucket',
      name: 'bucket',
      rules: [required],
      template: {
        disabled: !isEdit
      }
    },
    {
      label: '描述',
      name: 'description',
      rules: [required]
    },
    {
      label: 'accessKeyId',
      name: 'accessKeyId',
      rules: [required]
    },
    {
      label: 'secretAccessKey',
      name: 'secretAccessKey',
      rules: [required]
    }
  ]
    .map(v => {
      return merge({}, v, {
        template: {
          width: 400
        }
      })
    })
    .map(v => {
      if (isEdit) {
        return v
      }
      return {
        ...v,
        defaultValue: initialValues[v.name]
      }
    })
}

export const References = [
  { text: '便便传', href: 'http://upload-service.ke.com' },
  { text: 'Jax', href: 'http://jax.lianjia.com' },
  { text: 'Bucket', href: 'http://cloud.intra.ke.com/storage/bucket' }
]
