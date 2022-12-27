/*
 * @Author: shuoshubao
 * @Date:   2021-11-24 10:50:57
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-08-22 16:39:25
 * @Desc: 打包配置
 */

module.exports = ({ isDevelopment }) => {
  return {
    publicPath: isDevelopment ? '/' : './',
    configureWebpack: {
      target: 'electron-renderer',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
        moment: 'moment',
        lodash: '_'
      }
    },
    assets: {
      // css: ['https://unpkg.com/antd@4.20.0/dist/antd.min.css'],
      js: [
        'https://unpkg.com/lodash@4.17.21/lodash.min.js',
        `https://unpkg.com/react@18.2.0/umd/${isDevelopment ? 'react.development.js' : 'react.production.min.js'}`,
        `https://unpkg.com/react-dom@18.2.0/umd/${
          isDevelopment ? 'react-dom.development.js' : 'react-dom.production.min.js'
        }`,
        'https://unpkg.com/moment@2.25.3/min/moment.min.js',
        'https://unpkg.com/antd@4.20.0/dist/antd.min.js'
      ]
    },
    dllEntry: {
      tools: ['react-router-dom', 'axios', 'html2canvas', 'react-markdown', 'react-json-view', 'remark-gfm'],
      nbfe: ['@nbfe/tools', '@nbfe/components']
    }
  }
}
