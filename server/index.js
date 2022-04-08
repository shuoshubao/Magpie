/*
 * @Author: shuoshubao
 * @Date:   2022-04-08 16:27:39
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-08 17:47:57
 */

const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody({ patchKoa: true }))

app.use(async ctx => {
  console.log(111)
  console.log(ctx)

  ctx.body = {
    code: 0,
    msg: '',
    data: null
  }
})

app.listen(3000)
