import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p)

const moduleImport = (process.env.NODE_ENV === 'production')
  ? import(resolve('./production.js'))
  : import(resolve('./development.js'))

export async function createAppServer (server, options) {
  const { createAppServer } = await moduleImport
  return await createAppServer(server, options)
}

export async function createServerSideRender (appServer, options) {
  const { createServerSideRender } = await moduleImport
  return await createServerSideRender(appServer, options)
}
