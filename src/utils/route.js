/*
 * @Author: fangt11
 * @Date:   2021-07-09 13:24:17
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 22:13:04
 */
import { find } from 'lodash'
import { RouterConfig } from '@/routers'

// 获取 hash 模式下的 window.location.pathname
export const getPathname = () => {
  const { hash } = window.location
  return hash.slice(1, Math.max(hash.indexOf('?'), 0) || Infinity)
}

// 隐藏侧边栏的页面 为新窗口页面
export const checkShoulduHideSidebar = () => {
  const pathname = getPathname()
  const itemRouterConfig = find(RouterConfig, { path: pathname }) || {}
  return itemRouterConfig.hideSidebar || false
}
