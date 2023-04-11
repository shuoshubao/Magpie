const { resolve } = require('path')
const { getESLintConfig } = require('@nbfe/standard')

module.exports = getESLintConfig(['react'], {
  parserOptions: {
    babelOptions: {
      configFile: resolve(__dirname, 'node_modules/@nbfe/react-cli/babel.config.js')
    }
  },
  rules: {
    camelcase: [0]
  }
})
