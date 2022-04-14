import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const hashPath = window.localStorage.getItem('memoizeHash')

if (hashPath) {
  window.location.hash = hashPath;
}

ReactDOM.render(<App />, document.getElementById('root'))
