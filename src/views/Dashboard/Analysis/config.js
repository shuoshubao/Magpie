/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:32:51
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-27 17:25:31
 */
import { div, mul } from '@nbfe/tools'
import { Typography } from 'antd'
import filesize from 'filesize'
import { map, sum } from 'lodash'
import React from 'react'

const { Text } = Typography

export const getColumns = () => {
  return [
    { title: '分类', dataIndex: 'type', width: 100 },
    { title: '文件数', dataIndex: 'length' },
    { title: '代码行数', dataIndex: 'lines' },
    { title: '代码量', dataIndex: 'count' },
    { title: '代码体积', dataIndex: 'size', render: filesize }
  ]
}

export const JsExtensions = ['.js', '.jsx', '.ts', '.tsx']
export const StyleExtensions = ['.css', '.less', '.scss']
export const ImageExtensions = ['.png', '.jpg', '.jepg']

export const getDataSource = ({ projectInofList }) => {
  const JsData = projectInofList.filter(v => {
    const { ext } = v
    return JsExtensions.includes(ext)
  })
  const StyleData = projectInofList.filter(v => {
    const { ext } = v
    return StyleExtensions.includes(ext)
  })
  const ImageData = projectInofList.filter(v => {
    const { ext } = v
    return ImageExtensions.includes(ext)
  })
  return [
    {
      type: 'Js',
      length: JsData.length,
      lines: sum(map(JsData, 'lines')),
      count: sum(map(JsData, 'count')),
      size: sum(map(JsData, 'size'))
    },
    {
      type: 'Style',
      length: StyleData.length,
      lines: sum(map(StyleData, 'lines')),
      count: sum(map(StyleData, 'count')),
      size: sum(map(StyleData, 'size'))
    },
    {
      type: 'Image',
      length: ImageData.length,
      lines: sum(map(ImageData, 'lines')),
      count: sum(map(ImageData, 'count')),
      size: sum(map(ImageData, 'size'))
    }
  ]
}

export const getProgressPercent = EslintData => {
  const { results } = EslintData
  if (!results) {
    return 0
  }
  const errResults = results.filter(v => v.messages.length)
  return mul(div(errResults.length, results.length), 100).toFixed(2)
}

export const getProgressFormat = EslintData => {
  return percent => {
    const { results } = EslintData
    if (!results) {
      return '--'
    }
    const errResults = results.filter(v => v.messages.length)
    return (
      <>
        <div>{percent}%</div>
        <div>
          <Text type={errResults.length ? 'danger' : 'success'}>{errResults.length}</Text>
          <span> / </span>
          <span>{results.length}</span>
        </div>
      </>
    )
  }
}

export const getColumnData = projectList => {
  const xFieldList = [
    {
      label: 100,
      value: 0
    },
    {
      label: 200,
      value: 0
    },
    {
      label: 300,
      value: 0
    },
    {
      label: 400,
      value: 0
    },
    {
      label: 500,
      value: 0
    },
    {
      label: 600,
      value: 0
    },
    {
      label: 700,
      value: 0
    }
  ]
  const moreItem = { label: '>=700', value: 0 }
  projectList
    .filter(v => {
      const { ext } = v
      return JsExtensions.includes(ext)
    })
    .forEach(v => {
      const { lines } = v
      const index = xFieldList.findLastIndex(v2 => lines > v2.label) + 1
      if (index >= xFieldList.length) {
        moreItem.value++
      } else {
        xFieldList[index].value++
      }
    })
  return xFieldList.concat(moreItem.value ? moreItem : null).filter(Boolean)
}
