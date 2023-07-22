export function renderPageHtml (appTags) {
  const { prefetch, content } = appTags
  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${prefetch}
      </head>
      <body>${content}</body>
    </html>`
}
