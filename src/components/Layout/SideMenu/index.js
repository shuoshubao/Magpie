/*
 * @Author: fangt11
 * @Date:   2021-07-05 16:14:26
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-05-11 17:10:38
 */

import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { Menu } from 'antd'
import { map } from 'lodash'
import { RouterConfig } from '@/routers'
import { getPathname, getTheme } from '@/utils'

// eslint-disable-next-line sonarjs/cognitive-complexity
const Index = () => {
  const collapsed = JSON.parse(window.localStorage.getItem('sider-collapsed')) || false

  const [theme, setTheme] = useState(getTheme())

  const filterRouterConfig = RouterConfig.filter(v => {
    return !!v.name
  })

  useEffect(() => {
    ipcRenderer.on('theme-updated', () => {
      setTheme(getTheme())
    })
  }, [setTheme])

  if (filterRouterConfig.length === 0) {
    return null
  }

  return (
    <Menu
      theme={theme}
      mode="inline"
      selectedKeys={[getPathname()]}
      defaultOpenKeys={collapsed ? [] : map(filterRouterConfig, 'name')}
    >
      {filterRouterConfig.map(v => {
        const { icon = null, hideNav = false, children = [] } = v
        if (hideNav) {
          return null
        }
        if (children.length === 0) {
          return (
            <Menu.Item key={v.path} icon={icon} title={v.name}>
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
