import Koa from 'koa'
import KoaSession from 'koa-session'
export { default as ExampleVue3 } from './example-vue3.mjs'
export { createRouter } from './router.mjs'

export function createApp () {
  const app = new Koa()
  app.keys = ['vue3-ssr-example-secret']
  app.use(KoaSession({
    key: 's',
    maxAge: 60 * 60 * 1000
  }, app))
  return app
}
