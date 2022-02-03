import env from './env.js'
import manifest from './manifest.js'
export default async function () {
  console.log(`create render by ${env.ssrPath}`)
  const main = await import(env.ssrPath)
  const ssr = main.default

  return async (ctx, next) => {
    const html = await ssr({
      appId: `_${manifest.hash}`
    })

    ctx.body = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>About blank</title>
      <link rel="stylesheet" href="${manifest['main.css']}">
    </head>
    <body>${html}</body>
    <script src="${manifest['main.js']}" defer></script>
  </html>`
  }
}
