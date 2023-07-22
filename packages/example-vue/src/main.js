import BootstrapVueNext from 'bootstrap-vue-next'
import { createPinia } from './pinia/create.js'
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router.js'

// ref https://github.com/vitejs/vite-plugin-vue/blob/93c444cb99d64c65b71050d0f6a5e3016f7046a1/playground/ssr-vue/src/main.js#L9
export function createApp (state = {}) {
  const app = createSSRApp(App)
  app.use(BootstrapVueNext)
  const pinia = createPinia()
  pinia.state.value = state
  app.use(pinia)
  const router = createRouter()
  app.use(router)
  return { app, router }
}

export async function createReadyApp (url) {
  const { app, router } = createApp()

  await router.push(url)
  await router.isReady()

  return app
}

function getAppId () {
  const m = /([0-9a-f]{8}).js$/.exec(import.meta.url)
  if (m) {
    return m[1]
  }

  return 'app'
}

export const appId = getAppId()
