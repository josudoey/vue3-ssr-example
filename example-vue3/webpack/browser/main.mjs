/* global __webpack_hash__ */
// see https://getbootstrap.com/docs/5.1/getting-started/webpack/#importing-compiled-css
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { createApp, createWebRouter } from '~example-vue3/index.mjs'

;(async function () {
  const appId = `#_${__webpack_hash__}`
  console.log(`mount ${appId}`)
  const app = createApp()
  app.use(BootstrapVue3)
  const router = createWebRouter()
  app.use(router)
  await router.isReady()
  app.mount(appId)
})()
