import Koa from 'koa'
import KoaRouter from 'koa-router'
import * as http from 'http'
import staticCache from 'koa-static-cache'
import manifest from './manifest.mjs'
import { createRenderer, createApp } from './ssr.mjs'
import env from './env.js'
const { publicPath, browserOutputPath } = env

;(async function main () {
  const app = new Koa()
  const router = new KoaRouter()
  app.use(staticCache(browserOutputPath, {
    prefix: publicPath,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    dynamic: true
  }))
  const renderer = createRenderer(manifest)
  router.get('/', async function (ctx, next) {
    const vm = createApp()
    const html = await renderer.renderToString(vm, {
      state: ctx.state
    })
    ctx.status = 200
    ctx.body = html
  })
  app.use(router.routes())
  const server = http.createServer(app.callback())
  server.on('listening', async function () {
    const address = server.address()
    const port = address.port
    console.log(`service listen on ${address.address}:${port}`)
  })
  server.listen(3000)
})()
