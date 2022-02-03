const path = require('path')
const publicPath = '/_/'
const distPath = process.env.NODE_ENV === 'production' ? path.join(__dirname, 'dist') : path.join(__dirname, 'dist.dev')
const browserOutputPath = path.join(distPath, 'browser', publicPath)
const manifestPath = path.join(distPath, 'browser', 'manifest.json')
const ssrOutputPath = path.join(distPath, 'ssr')
const ssrPath = path.join(distPath, 'ssr', 'main.mjs')
const env = {
  distPath,
  publicPath,
  browserOutputPath,
  manifestPath,
  ssrOutputPath,
  ssrPath
}

module.exports = env
