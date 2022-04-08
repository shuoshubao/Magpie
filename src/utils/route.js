/*
 * @Author: fangt11
 * @Date:   2021-07-09 13:24:17
 * @Last Modified by:   fangt11
 * @Last Modified time: 2021-07-09 13:27:49
 */

// 获取 hash 模式下的 window.location.pathname
export const getPathname = () => {
  const { hash } = window.location
  return hash.slice(1, Math.max(hash.indexOf('?'), 0) || Infinity)
}
