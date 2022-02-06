import env from './env.cjs'
const ssrModule = await import(env.ssrPath)
const { createRenderer, createApp } = ssrModule
export { createRenderer, createApp }
