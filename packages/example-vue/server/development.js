// @ts-check
import { resolve } from 'node:path'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createServer } from 'vite'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function createAppServer (
  server,
  options = {}
) {
  /**
   * @type {import('vite').ViteDevServer}
   */

  const viteServer = await createServer({
    base: '/',
    root: resolve(__dirname, '../'),
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      },
      hmr: {
        server
      }
    },
    appType: 'custom',
    ...(options.vite || {})
  })

  return viteServer
}

export async function createServerSideRender (viteServer) {
  const {
    existsRoute,
    createReadyApp,
    renderPiniaStateScriptTag,
    renderToString,
    renderPageHtml,
    appId
  } = await viteServer.ssrLoadModule('/src/entry/ssr/index.js')

  async function renderToAppTags (app, ctx = {}) {
    const appContent = await renderToString(app, ctx)
    const piniaStateScriptTag = await renderPiniaStateScriptTag(app)

    return {
      prefetch: '',
      content: `<div id="_${appId}">${appContent}</div>
      <script type="module" src="/@vite/client"></script>
      <script type="module" src="/src/entry/browser/main.js"></script>
      ${piniaStateScriptTag}`
    }
  }

  async function renderToHtml (app, ctx = {}) {
    const appTags = await renderToAppTags(app, ctx)
    return renderPageHtml(appTags)
  }

  return {
    existsRoute,
    createReadyApp,
    renderToAppTags,
    renderToHtml
  }
}
