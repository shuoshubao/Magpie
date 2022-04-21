/*
 * @Author: fangt11
 * @Date:   2021-07-27 15:16:58
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-14 19:21:18
 */

const { sync: globSync } = require('glob')
const { uploadFile } = require('@jiaoyi/s3')

const fileList = globSync('dist/{css,js,assets}/**', { nodir: true })

fileList.forEach(v => {
  uploadFile(
    v,
    {
      fileNameComputeFunc: relativePath => {
        return ['electron', relativePath].join('/')
      }
    },
    { bucket: 'tent' }
  )
})