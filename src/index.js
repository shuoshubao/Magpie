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

const App = () => {
  return (
    <div>
      <Button type="primary">按钮</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
