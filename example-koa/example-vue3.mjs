import staticCache from 'koa-static-cache'
import KoaRouter from 'koa-router'
import createDebug from 'debug'
const debug = createDebug('app:example-vue3')

export function createRoute (ssr) {
  const {
    createRenderer,
    createApp,
    createMemoryRouter,
    createPinia,
    manifest
  } = ssr
  const renderer = createRenderer(manifest)
  return async function (ctx, next) {
    const $router = createMemoryRouter()
    await $router.push(ctx.url)
    await $router.isReady()

    const pinia = createPinia()
    const app = await createApp().use(pinia).use($router)
    const html = await renderer.renderToString(app)

    ctx.status = 200
    ctx.type = 'text/html'
    ctx.body = html
  }
}

export function createBrowserStatic ({
  browserOutputPath,
  publicPath
}) {
  return staticCache(browserOutputPath, {
    prefix: publicPath,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    dynamic: true
  })
}

export const createSSRRouter = function ({
  routes,
  ssrRoute
}) {
  const router = new KoaRouter()
  for (const route of routes) {
    router.get(route.name, route.path, xsrfToken.create, ssrRoute)
  }
  return router
}

export default {
  install (app, options) {
    const {
      createRenderer,
      createApp,
      createMemoryRouter,
      createPinia,
      manifest,
      browserOutputPath,
      publicPath
    } = options

    app.use(createBrowserStatic({
      browserOutputPath,
      publicPath
    }))

    const vueRouter = createMemoryRouter()
    const matchedComponent = async function (ctx, next) {
      // see https://next.router.vuejs.org/api/#resolve
      //     https://next.router.vuejs.org/api/#routelocationnormalized
      const routeLocation = vueRouter.resolve(ctx.path)
      if (!routeLocation.matched.length) {
        return
      }
      await next()
    }

    const ssrRoute = createRoute({
      createRenderer,
      createApp,
      createMemoryRouter,
      createPinia,
      manifest
    })

    const router = new KoaRouter()
    router.get('/(.*)', matchedComponent, ssrRoute)
    app.use(router.routes())
  }
}
