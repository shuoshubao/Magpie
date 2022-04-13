/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:06:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 17:51:43
 */
import { last } from 'lodash'
import filesize from 'filesize'

export const columns = [
  {
    title: '缩略图',
    dataIndex: 'base64',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '路径',
    dataIndex: 'path',
    transform: value => {
      return last(value.split('/'))
    }
  },
  {
    title: '大小',
    dataIndex: 'size',
    transform: filesize,
    width: 100
  }
]
