/*
 * @Description: 文件描述
 * @Author: fangt11
 * @Date: 2022-04-02 15:50:07
 * @LastEditTime: 2022-04-02 15:50:08
 * @LastEditors: fangt11
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import { ipcRenderer } from 'electron'

document.title = 'React'

const App = () => {
  const handleClick = () => {
    ipcRenderer.send('get-pkg', 'package.json')
  }

  ipcRenderer.on('get-pkg-reply', (event, arg, arg2) => {
    console.log(222)
    console.log(arg)
    console.log(arg2)
  })

  const pkg = ipcRenderer.sendSync('sync-get-pkg')

  console.log(333)
  console.log(pkg)

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        按钮
      </Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
