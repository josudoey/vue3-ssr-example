import { renderToString, createApp } from './ssr.mjs'
import manifest from './manifest.mjs'
export default async function () {
  return async (ctx, next) => {
    const html = await renderToString(createApp())

    ctx.body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body><div id="_${manifest.hash}">${html}</div></body>
    <script src="${manifest['main.js']}" defer></script>
  </html>`
  }
}
