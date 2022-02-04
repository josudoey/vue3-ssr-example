import env from './env.js'
const ssrModule = await import(env.ssrPath)
const { renderToString, createApp } = ssrModule
export { renderToString, createApp }
