import React, { Suspense } from 'react'
import { ConfigProvider, Skeleton } from 'antd'
import moment from 'moment'
import { getAntdLocaleZhCN, defineMomentLocaleZhCn } from '@nbfe/tools'
import Layout from '@/components/Layout'
import '@/utils/monitor'
import '@/assets/styles/index.less'
import '@nbfe/form/dist/index.css'
import '@nbfe/table/dist/index.css'

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
