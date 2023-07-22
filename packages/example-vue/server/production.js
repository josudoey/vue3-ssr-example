// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import connect from 'connect'
import compression from 'compression'
import ServeStatic from 'serve-static'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const resolve = (p) => path.resolve(__dirname, p)
const manifest = JSON.parse(fs.readFileSync(resolve('../dist/ssr/manifest.json'), 'utf-8'))

function getAssetsPath () {
  return resolve('../dist/browser/_')
}

function getSSRPath () {
  return resolve('../dist/ssr/' + manifest['src/entry/ssr/main.js'].file)
}

export async function createAppServer (
  server,
  options = {}
) {
  const middlewares = connect()
  middlewares
    .use('/_/', compression())
    .use(
      '/_/',
      ServeStatic(getAssetsPath(), {
        index: false,
        ...(options.serveStatic || {})
      })
    )

  return {
    middlewares
  }
}

export async function createServerSideRender (appServer) {
  return await import(getSSRPath())
}
