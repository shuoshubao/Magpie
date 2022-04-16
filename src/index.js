import React from 'react'
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'
import { checkShoulduHideSidebar, getTheme, isDarkTheme } from '@/utils'
import App from './App'

const hashPath = window.localStorage.getItem('memoizeHash')

if (!checkShoulduHideSidebar() && hashPath) {
  window.location.hash = hashPath
}

ipcRenderer.on('showErrorBox', (event, title, content) => {
  Modal.error({
    title,
    content,
    width: '90%',
    style: {
      top: 20
    }
  })
})
;(async () => {
  document.body.dataset.theme = getTheme()

  if (isDarkTheme()) {
    await import('antd/dist/antd.dark.min.css')
  } else {
    await import('antd/dist/antd.min.css')
  }

  ReactDOM.render(<App />, document.getElementById('root'))
})()
