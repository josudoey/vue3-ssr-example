import http from 'http'
import env from './env.cjs'
import { ExampleVue3, createApp, createRouter } from '~example-koa/index.mjs'
import vue3ExampleManifest from './example-vue3-manifest.mjs'
import * as exampleVue3SSR from './example-vue3-ssr.mjs'
const { publicPath, browserOutputPath } = env

;(async function main () {
  const app = createApp({})
  const router = createRouter()
  app.use(router.routes())
  ExampleVue3.install(app, {
    ...exampleVue3SSR,
    publicPath,
    manifest: vue3ExampleManifest,
    browserOutputPath
  })
  app.use(router.allowedMethods())

  const server = http.createServer(app.callback())
  server.on('listening', async function () {
    const address = server.address()
    const port = address.port
    console.log(`service listen on ${address.address}:${port}`)
  })
  server.listen(3000)
})()
