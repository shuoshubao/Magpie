/*
 * @Author: fangt11
 * @Date:   2022-04-29 15:18:40
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-29 15:19:25
 */
import { request } from './axios'

export const fetchPkg = ({ registry, name }) => {
  return request(
    {
      url: [registry, name].join('/')
    },
    {
      showLoading: false,
      checkCode: false,
      cacheThreshold: 10 * 60 * 1000 // 10 分钟
    }
  ).then(res => {
    return res.data
  })
}
