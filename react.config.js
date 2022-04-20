/*
 * @Author: fangt11
 * @Date:   2021-11-24 10:50:57
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-16 23:39:01
 * @Desc: 打包配置
 */

module.exports = ({ isDevelopment, isProduction }) => {
  return {
    // publicPath: isDevelopment ? '/' : './',
    publicPath: isDevelopment ? '/' : 'https://storage.lianjia.com/tent/electron/dist/',
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
      // css: ['https://file.ljcdn.com/bs/antd/4.18.7/dist/antd.min.css'],
      js: [
        'https://file.ljcdn.com/bs/lodash/4.17.21/lodash.min.js',
        `https://file.ljcdn.com/bs/react/17.0.2/umd/${
          isDevelopment ? 'react.development.js' : 'react.production.min.js'
        }`,
        `https://file.ljcdn.com/bs/react-dom/17.0.2/umd/${
          isDevelopment ? 'react-dom.development.js' : 'react-dom.production.min.js'
        }`,
        'https://file.ljcdn.com/bs/moment/2.25.3/min/moment.min.js',
        'https://file.ljcdn.com/bs/antd/4.18.7/dist/antd.min.js'
      ]
    },
    dllEntry: {
      tools: ['html2canvas', 'react-markdown', 'react-json-view', 'remark-gfm'],
      nbfe: ['@nbfe/tools', '@ke/form', '@ke/table'],
    }
  }
}
