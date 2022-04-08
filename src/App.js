import React, { Suspense } from 'react'
import { ConfigProvider, Button, notification } from 'antd'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import moment from 'moment'
import { getAntdLocaleZhCN, defineMomentLocaleZhCn } from '@nbfe/tools'
import Layout from '@/components/Layout'
import { isChrome } from '@/utils'
import '@/assets/styles/index.less'

defineMomentLocaleZhCn(moment)

moment.locale('zh-cn', {
  week: {
    dow: 1
  }
})

if (!isChrome()) {
  notification.warning({
    description: [
      <div key="0">为保证您的使用体验，建议您使用谷歌Chrome浏览器</div>,
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        size="small"
        href="https://www.baidu.com/s?wd=Chrome浏览器"
        target="_blank"
        key="1"
      >
        去下载
      </Button>
    ],
    duration: 10
  })
}

export default () => {
  return (
    <Suspense
      fallback={
        <div className="site-layout-loading">
          <div className="site-layout-loading-container">
            <LoadingOutlined />
            <div className="site-layout-loading-text">页面加载中...</div>
          </div>
        </div>
      }
    >
      <ConfigProvider locale={getAntdLocaleZhCN()}>
        <Layout />
      </ConfigProvider>
    </Suspense>
  )
}
