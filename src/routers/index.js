/*
 * @Author: shuoshubao
 * @Date:   2021-07-05 14:35:18
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-13 14:04:13
 */

import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Skeleton } from 'antd'
import RouterConfig from './config'

const dealRouter = () => {
  const ret = []
  RouterConfig.forEach(v => {
    const { children = [] } = v
    if (children.length) {
      children.forEach(v2 => {
        ret.push({ ...v2, categoryName: v.name })
      })
    } else {
      ret.push({ ...v, categoryName: null })
    }
  })
  return ret
}

const RouterConfigList = dealRouter()

export const RenderRouter = () => {
  return (
    <Routes>
      {RouterConfigList.map(item => {
        const { path, component: Component } = item
        return (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Skeleton active />}>
                <Component />
              </Suspense>
            }
          />
        )
      })}
    </Routes>
  )
}

export { RouterConfig }
