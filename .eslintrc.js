const { resolve } = require('path')
const { getESLintConfig } = require('@ke/standard')

module.exports = getESLintConfig(['react'], {
  parserOptions: {
    babelOptions: {
      configFile: resolve(__dirname, 'node_modules/@ke/react-cli/babel.config.js')
    }
  },
})
