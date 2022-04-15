import React from 'react'
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'
import App from './App'

const hashPath = window.localStorage.getItem('memoizeHash')

if (hashPath) {
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
  const SiteTheme = window.localStorage.getItem('site-theme')

  const isDarkTheme = SiteTheme === 'dark'

  document.body.dataset.theme = isDarkTheme ? 'dark' : 'default'

  if (isDarkTheme) {
    await import('antd/dist/antd.dark.min.css')
  } else {
    await import('antd/dist/antd.min.css')
  }

  ReactDOM.render(<App />, document.getElementById('root'))
})()
