/*
 * @Author: fangt11
 * @Date:   2021-11-24 10:50:57
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-06-27 14:06:20
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
      // css: ['https://file.ljcdn.com/bs/antd/4.20.0/dist/antd.min.css'],
      js: [
        'https://file.ljcdn.com/bs/lodash/4.17.21/lodash.min.js',
        `https://file.ljcdn.com/bs/react/17.0.2/umd/${
          isDevelopment ? 'react.development.js' : 'react.production.min.js'
        }`,
        `https://file.ljcdn.com/bs/react-dom/17.0.2/umd/${
          isDevelopment ? 'react-dom.development.js' : 'react-dom.production.min.js'
        }`,
        'https://file.ljcdn.com/bs/moment/2.25.3/min/moment.min.js',
        'https://file.ljcdn.com/bs/antd/4.20.0/dist/antd.min.js'
      ]
    },
    dllEntry: {
      tools: ['react-router-dom', 'axios', 'html2canvas', 'react-markdown', 'react-json-view', 'remark-gfm'],
      nbfe: ['@nbfe/tools', '@nbfe/form', '@nbfe/table']
    },
    chainWebpack: (config) => {
       config.plugin('NodePolyfillPlugin').tap(() => {
         return [{ excludeAliases: ['process'] }]
       })
    }
  }
}
