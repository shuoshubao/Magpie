import React from 'react'
import { createRoot } from 'react-dom/client'
import { ipcRenderer } from 'electron'
import { isDevelopment } from '@/configs'
import { checkShoulduHideSidebar, setTheme } from '@/utils'
import '@/configs/ipc'
import App from './App'

const memoizePath = window.localStorage.getItem('path')

// eslint-disable-next-line sonarjs/no-collapsible-if
if (isDevelopment) {
  if (!checkShoulduHideSidebar() && memoizePath) {
    window.location.hash = memoizePath
  }
}

const init = async () => {
  await setTheme()

  createRoot(document.querySelector('#app')).render(<App />)
}

init()

const config = ipcRenderer.sendSync('getMainConfig')
// eslint-disable-next-line no-console
console.log(config)
