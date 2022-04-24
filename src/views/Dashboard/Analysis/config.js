/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:32:51
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 17:42:15
 */
import { map, sum } from 'lodash'
import filesize from 'filesize'

export const getColumns = () => {
  return [
    { title: '分类', dataIndex: 'type', width: 100 },
    { title: '文件数', dataIndex: 'length' },
    { title: '代码行数', dataIndex: 'lines' },
    { title: '代码量', dataIndex: 'count' },
    { title: '代码体积', dataIndex: 'size', render: filesize }
  ]
}

export const getDataSource = ({ projectInofList }) => {
  const JsData = projectInofList.filter(v => {
    const { ext } = v
    return ['.js', '.jsx', '.ts', '.tsx'].includes(ext)
  })
  const StyleData = projectInofList.filter(v => {
    const { ext } = v
    return ['.css', '.less', '.scss'].includes(ext)
  })
  const ImageData = projectInofList.filter(v => {
    const { ext } = v
    return ['.png', '.jpg', '.jepg'].includes(ext)
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
