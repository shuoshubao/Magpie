/*
 * @Author: shuoshubao
 * @Date:   2021-07-09 15:21:49
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 22:00:43
 * @Desc: 色值
 */

// import * as Colors from '@ant-design/colors'
import * as AntdColors from '@ant-design/colors'

export const Colors = Object.entries(AntdColors).reduce((prev, [k, v]) => {
  prev[k] = v.primary
  return prev
}, {})

export const LogColors = {
  error: Colors.red,
  warn: Colors.yellow,
  info: Colors.blue,
  verbose: Colors.grey,
  debug: Colors.grey,
  silly: Colors.grey
}
