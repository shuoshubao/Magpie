/*
 * @Author: fangt11
 * @Date:   2021-07-05 19:52:43
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-08 11:34:33
 */
export * from './route'
export * from './axios'

// 格式化部分时长
export const formatDuration = (time = 0) => {
  const hours = Math.floor(time / 3600)
  const minute = Math.floor(Math.floor(time % 3600) / 60)
  const second = time % 60
  if (hours) {
    return [hours, minute, second]
      .map(v => {
        return String(v).padStart(2, '0')
      })
      .join(':')
  }
  return [minute, second]
    .map(v => {
      return String(v).padStart(2, '0')
    })
    .join(':')
}

export const isChrome = () => {
  return window.navigator.userAgent.includes('Chrome')
}
