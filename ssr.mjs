import env from './env.js'
const ssrModule = await import(env.ssrPath)
const { createRenderer, createApp } = ssrModule
export { createRenderer, createApp }
