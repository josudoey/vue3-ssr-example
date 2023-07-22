import { Command } from 'commander'
import { createAppServer, createServerSideRender } from '@vue3-ssr-example/example-vue/server/index.js'
import { createApp } from '../app.js'
import { createServer } from '../server.js'

const program = new Command()

// ref https://github.com/vkurchatkin/koa-connect/blob/3f7c4020604895f6693c622fd0b48b377005f5da/index.js#L16
function c2k (middleware) {
  return async function (ctx, next) {
    const { req, res } = ctx
    return new Promise((resolve, reject) => {
      const { status } = ctx
      ctx.status = 200
      middleware(req, res, (err) => {
        ctx.status = status
        if (err) {
          reject(err)
          return
        }
        resolve(next())
      })
    })
  }
}

program.command('server')
  .option('-p, --port <port>', 'web service listen port default:[3000]', 3000)
  .description('start a http dev service.')
  .action(async function (opts) {
    const app = createApp()
    const server = createServer(app)
    const appServer = await createAppServer(server, {
      serveStatic: {
        maxAge: 3600 * 1000 // 1 hour
      }
    })

    app.use(c2k(appServer.middlewares))
    const ssr = await createServerSideRender(appServer)

    app.use(async function (ctx, next) {
      const { url } = ctx
      if (!ssr.existsRoute(url)) {
        next()
        return
      }

      const app = await ssr.createReadyApp(url)
      ctx.status = 200
      ctx.body = await ssr.renderToHtml(app)
    })

    server.on('listening', async function () {
      const address = server.address()
      const port = address.port
      console.info(`service listen on ${port}`)
    })

    server.on('error', function (err) {
      console.error(err)
      process.exit(1)
    })

    process.on('uncaughtException', function (err) {
      console.error(err.stack)
    })

    process.on('unhandledRejection', function (err) {
      console.error(err.stack)
    })

    server.listen(opts.port)
  })

program.parse()
