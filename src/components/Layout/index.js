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
import SideMenu from './SideMenu'
import '@/assets/styles/index.less'

const { Content, Sider } = Layout

const getPathName = () => {
  const { hash } = window.location
  const hasQuery = hash.includes('?')
  return hash.slice(1, hasQuery ? hash.indexOf('?') : Infinity)
}

const Index = () => {
  const contentRef = useRef()

  const [hideSidebar, setHideSidebar] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const updateSidebar = () => {
    const pathname = getPathName()
    const itemRouterConfig = find(RouterConfig, { path: pathname }) || {}
    setHideSidebar(itemRouterConfig.hideSidebar || false)
  }

  useEffect(() => {
    updateSidebar()
    window.addEventListener('hashchange', () => {
      updateSidebar()
    })
  }, [setHideSidebar])

  const siteLayoutMarginLeft = collapsed ? 80 : 180

  const { stdout } = ipcRenderer.sendSync('execaSync', 'git', ['config', '--global', 'user.name'])

  const userName = stdout

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
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
          <a href="/#/" className="site-layout-logo">
            <DesktopOutlined className="site-layout-logo-icon" />
            <span className="site-layout-logo-text">Magpie</span>
          </a>
          <div className="site-layout-link">
            <div className="site-layout-link">
              <div className="site-layout-link-item">
                <UserOutlined />
                <span>{userName}</span>
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
          <div ref={contentRef} style={{ position: 'relative', height: '100%', padding: 10 }}>
            <RenderRouter />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

Index.displayName = 'SiteLayout'

export default Index
