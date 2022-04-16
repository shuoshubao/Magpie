import React from 'react'
import ReactDOM from 'react-dom'
import { checkShoulduHideSidebar, getTheme, isDarkTheme } from '@/utils'
import '@/configs/ipc'
import App from './App'

const memoizePath = window.localStorage.getItem('path')

if (!checkShoulduHideSidebar() && memoizePath) {
  window.location.hash = memoizePath
}

;(async () => {
  document.body.dataset.theme = getTheme()

  if (isDarkTheme()) {
    await import('antd/dist/antd.dark.min.css')
  } else {
    await import('antd/dist/antd.min.css')
  }

  ReactDOM.render(<App />, document.getElementById('root'))
})()
