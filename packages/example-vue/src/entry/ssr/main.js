import ssrManifest from '../../../dist/browser/ssr-manifest.json'
import manifest from '../../../dist/browser/manifest.json'
import { renderPreloadLinks, renderPiniaStateScriptTag, renderToString, renderPageHtml } from './renderer.js'
export { createReadyApp } from '../../main.js'

const base = import.meta.env.BASE_URL
export { existsRoute } from './router.js'
const { file, css } = manifest['index.html']

const appId = /([0-9a-f]{8}).js$/.exec(ssrManifest['src/main.js'][0])[1]

const entryScript = `<script type="module" src="${base + file}"></script>`
const entryCssLinks = css.map((href) => {
  return `<link rel="stylesheet" href="${base + href}">`
}).join('')

export async function renderToAppTags (app, ctx = {}) {
  const appHtml = await renderToString(app, ctx)
  const piniaStateScriptTag = await renderPiniaStateScriptTag(app)
  const preloadLinks = renderPreloadLinks(ctx.modules, ssrManifest)

  return {
    prefetch: `${preloadLinks}${entryScript}${entryCssLinks}`,
    content: `<div id="_${appId}">${appHtml}</div>${piniaStateScriptTag}`
  }
}

export async function renderToHtml (app, ctx = {}) {
  const appTags = await renderToAppTags(app, ctx)
  return renderPageHtml(appTags)
}
