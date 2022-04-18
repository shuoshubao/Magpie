import React from 'react'
import ReactDOM from 'react-dom'
import { checkShoulduHideSidebar, setTheme } from '@/utils'
import '@/configs/ipc'
import App from './App'

const memoizePath = window.localStorage.getItem('path')

if (!checkShoulduHideSidebar() && memoizePath) {
  window.location.hash = memoizePath
}

;(async () => {
  await setTheme()

  ReactDOM.render(<App />, document.getElementById('root'))
})()
