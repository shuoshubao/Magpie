import React, { Component, useRef, useState, useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import { Layout, Result, Card, Button } from 'antd'
import CoffeeOutlined from '@ant-design/icons/CoffeeOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { classNames } from '@nbfe/tools'
import { RenderRouter } from '@/routers'
import { checkShoulduHideSidebar, getTheme } from '@/utils'
import Preferences from '@/components/Preferences'
import SideMenu from './SideMenu'
import '@/assets/styles/index.less'

const { Content, Sider } = Layout

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    }
  }

  render() {
    const { hasError, error } = this.state
    if (!hasError) {
      return this.props.children
    }
    return (
      <>
        <Result
          status="error"
          title="代码执行报错!"
          subTitle="请尝试刷新页面~"
          extra={
            <Button
              type="primary"
              onClick={() => {
                window.location.reload()
              }}
            >
              刷新页面
            </Button>
          }
        />
        <Card title="错误信息">{error?.message}</Card>
      </>
    )
  }
}

const Index = () => {
  const contentRef = useRef()

  const [hideSidebar, setHideSidebar] = useState(true)
  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem('sider-collapsed')) || false)
  const [theme, setTheme] = useState(getTheme())

  useEffect(() => {
    setHideSidebar(checkShoulduHideSidebar())
  }, [setHideSidebar])

  useEffect(() => {
    ipcRenderer.on('theme-updated', () => {
      setTheme(getTheme())
    })
  }, [setTheme])

  const siteLayoutMarginLeft = collapsed ? 80 : 180

  const { APP_NAME } = ipcRenderer.sendSync('getMainConfig')

  const { username } = ipcRenderer.sendSync('os', 'userInfo')

  return (
    <HashRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          theme={theme}
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
              <CoffeeOutlined className="site-layout-logo-icon" />
              <span className="site-layout-logo-text">{APP_NAME}</span>
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
          <SideMenu />
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
              <ErrorBoundary>
                <RenderRouter />
              </ErrorBoundary>
            </div>
          </Content>
          <Preferences />
        </Layout>
      </Layout>
    </HashRouter>
  )
}

Index.displayName = 'SiteLayout'

export default Index
