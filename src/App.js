import '@/assets/styles/index.less'
import Layout from '@/components/Layout'
import '@/utils/monitor'
import '@nbfe/components/dist/index.css'
import { defineMomentLocaleZhCn, getAntdLocaleZhCN } from '@nbfe/tools'
import { ConfigProvider, Skeleton } from 'antd'
import moment from 'moment'
import React, { Suspense } from 'react'

defineMomentLocaleZhCn(moment)

moment.updateLocale('zh-cn', {
  week: {
    dow: 1
  }
})

export default () => {
  return (
    <Suspense fallback={<Skeleton active />}>
      <ConfigProvider locale={getAntdLocaleZhCN()}>
        <Layout />
      </ConfigProvider>
    </Suspense>
  )
}
