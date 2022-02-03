import env from './env.js'
import manifest from './manifest.js'
export default async function () {
  console.log(`create render by ${env.ssrPath}`)
  const main = await import(env.ssrPath)
  const { renderToString, createApp } = main

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
