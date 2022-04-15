/*
 * @Author: shuoshubao
 * @Date:   2022-04-12 15:06:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 17:47:11
 */
import filesize from 'filesize'

export const Extensions = ['png', 'jpg', 'jpeg', 'webp']

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
    transform: (value, record) => {
      const { filePath, isFile } = record
      if (isFile) {
        return value
      }
      return value.replace(`${filePath}/`, '')
    }
  },
  {
    title: '大小',
    dataIndex: 'size',
    transform: filesize,
    width: 100
  }
]
