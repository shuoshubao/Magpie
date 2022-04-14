import React from 'react'
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron'
import { Modal } from 'antd'
import App from './App'

const hashPath = window.localStorage.getItem('memoizeHash')

if (hashPath) {
  window.location.hash = hashPath
}

ReactDOM.render(<App />, document.getElementById('root'))

ipcRenderer.on('showErrorBox', (event, title, content) => {
  Modal.info({
    title,
    content,
    width: 1000,
    style: {
      top: 20
    }
  })
})
