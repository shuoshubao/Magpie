/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-15 20:55:50
 */

import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import { map } from 'lodash'
import { RouterConfig } from '@/routers'
import { getPathname } from '@/utils'

const SiteTheme = window.localStorage.getItem('site-theme')

const isDarkTheme = SiteTheme === 'dark'

// eslint-disable-next-line sonarjs/cognitive-complexity
const Index = () => {
  const filterRouterConfig = RouterConfig.filter(v => {
    return !!v.name
  })

  if (filterRouterConfig.length === 0) {
    return null
  }

  return (
    <Menu
      theme={isDarkTheme ? 'dark' : 'light'}
      mode="inline"
      selectedKeys={[getPathname()]}
      defaultOpenKeys={map(filterRouterConfig, 'name')}
    >
      {filterRouterConfig.map(v => {
        const { icon = null, hideNav = false, children = [] } = v
        if (hideNav) {
          return null
        }
        if (children.length === 0) {
          return (
            <Menu.Item key={v.name} icon={icon} title={v.name}>
              <Link to={v.path}>{v.name}</Link>
            </Menu.Item>
          )
        }
        return (
          <Menu.SubMenu key={v.name} title={v.name} icon={icon}>
            {children.map(v2 => {
              const { path, name } = v2
              if (v2.hideNav) {
                return null
              }
              return (
                <Menu.Item key={path}>
                  <Link to={path}>{name}</Link>
                </Menu.Item>
              )
            })}
          </Menu.SubMenu>
        )
      })}
    </Menu>
  )
}

Index.displayName = 'SideMenu'

export default withRouter(Index)
