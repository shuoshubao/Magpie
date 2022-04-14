import React, { Suspense } from 'react'
import { ConfigProvider, Button, notification } from 'antd'
import LoadingOutlined from '@ant-design/icons/LoadingOutlined'
import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import moment from 'moment'
import { getAntdLocaleZhCN, defineMomentLocaleZhCn } from '@nbfe/tools'
import Layout from '@/components/Layout'
import '@/utils/monitor'
import '@/assets/styles/index.less'
import '@ke/form/dist/index.css'
import '@ke/table/dist/index.css'

defineMomentLocaleZhCn(moment)

moment.locale('zh-cn', {
  week: {
    dow: 1
  }
})

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
