import Koa from 'koa'
import KoaSession from 'koa-session'
import { createRouter } from './router.js'

export function createApp () {
  const app = new Koa()
  app.keys = ['example-server-secret']
  app.use(KoaSession({
    key: 's',
    maxAge: 60 * 60 * 1000
  }, app))
  const router = createRouter()
  app.use(router.routes())
  app.use(router.allowedMethods())
  return app
}
