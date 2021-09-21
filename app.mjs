import Koa from 'koa'
import KoaRouter from 'koa-router'
import * as http from 'http'
import staticCache from 'koa-static-cache'
import createRender from './create-render.mjs'
import env from './env.js'
const { publicPath, assetOutputPath } = env

;(async function main () {
  const render = await createRender()
  const app = new Koa()
  const router = new KoaRouter()
  app.use(staticCache(assetOutputPath, {
    prefix: publicPath,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    dynamic: true
  }))
  router.get('/', render)
  app.use(router.routes())
  const server = http.createServer(app.callback())
  server.on('listening', async function () {
    const address = server.address()
    const port = address.port
    console.log(`service listen on ${address.address}:${port}`)
  })
  server.listen(3000)
})()
