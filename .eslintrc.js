const { merge } = require('lodash')
const EslintConfig = require('@ke/standard/eslint')

module.exports = merge({}, EslintConfig, {
  rules: {
    'react/jsx-wrap-multilines': [0],
    'react/no-children-prop': [0],
    'react/jsx-one-expression-per-line': [0]
  }
})
