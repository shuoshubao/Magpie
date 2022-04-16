import React, { useRef, useState, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { Layout, Menu, Dropdown, message } from 'antd'
import DesktopOutlined from '@ant-design/icons/DesktopOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined'
import { get, find } from 'lodash'
import { classNames } from '@nbfe/tools'
import { RouterConfig, RenderRouter } from '@/routers'
import { checkShoulduHideSidebar, getTheme } from '@/utils'
import SideMenu from './SideMenu'
import '@/assets/styles/index.less'

const { Content, Sider } = Layout

const Index = () => {
  const contentRef = useRef()

  const [hideSidebar, setHideSidebar] = useState(true)
  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem('sider-collapsed')) || false)

  useEffect(() => {
    setHideSidebar(checkShoulduHideSidebar())
    window.addEventListener('hashchange', () => {
      const { hash } = window.location
      const hashPath = hash.slice(0, hash.includes('?') ? hash.indexOf('?') : Infinity)
      window.localStorage.setItem('path', hashPath)
      setHideSidebar(checkShoulduHideSidebar())
    })
  }, [setHideSidebar])

  const siteLayoutMarginLeft = collapsed ? 80 : 180

  const { username } = ipcRenderer.sendSync('os', 'userInfo')

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme={getTheme()}
        collapsible
        collapsed={collapsed}
        onCollapse={value => {
          window.localStorage.setItem('sider-collapsed', JSON.stringify(value))
          setCollapsed(value)
        }}
        width={180}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
        className={classNames('site-layout-sider', { hidden: hideSidebar })}
      >
        <div className="site-layout-logo-link">
          <a
            className="site-layout-logo"
            onClick={() => {
              window.location.hash = '#/'
            }}
          >
            <DesktopOutlined className="site-layout-logo-icon" />
            <span className="site-layout-logo-text">Magpie</span>
          </a>
          <div className="site-layout-link">
            <div className="site-layout-link">
              <div className="site-layout-link-item">
                <UserOutlined />
                <span>{username}</span>
              </div>
            </div>
          </div>
        </div>
        <HashRouter>
          <SideMenu />
        </HashRouter>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: hideSidebar ? 0 : siteLayoutMarginLeft }}>
        <Content style={{ padding: 0, overflow: 'initial', flex: 1 }}>
          <div
            className="site-layout-content"
            ref={contentRef}
            style={{
              position: 'relative',
              height: '100%',
              padding: 10,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <RenderRouter />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

Index.displayName = 'SiteLayout'

export default Index
