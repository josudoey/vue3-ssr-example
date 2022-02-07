import env from './env.cjs'
const ssrModule = await import(env.ssrPath)
export const { createRenderer, createApp, createMemoryRouter, createPinia } = ssrModule
