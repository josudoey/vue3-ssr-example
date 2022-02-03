/* global __webpack_hash__ */
// see https://getbootstrap.com/docs/5.1/getting-started/webpack/#importing-compiled-css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import createApp from '../create-app.mjs'

;(async function () {
  const vm = createApp()
  const appId = `#_${__webpack_hash__}`
  console.log(`mount ${appId}`)
  vm.mount(appId)
})()
