/*
 * @Author: shuoshubao
 * @Date:   2022-04-08 16:27:39
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-12 20:08:38
 */

const Koa = require('koa')
const koaBody = require('koa-body')
const { KOA_PROT } = require('../main/config')

const app = new Koa()

app.use(koaBody({ patchKoa: true }))

app.use(async ctx => {
  ctx.body = {
    code: 0,
    msg: '',
    data: 'electron'
  }
})

app.listen(KOA_PROT)
