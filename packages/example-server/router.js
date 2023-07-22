import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'

export function createRouter () {
  return new KoaRouter()
    .use(bodyParser({
      jsonLimit: '1mb',
      formLimit: '56kb'
    }))
}
