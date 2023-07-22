import { createApp, appId } from '../../main.js'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount(`#_${appId}`)
  console.log(`hydrated #_${appId}`)
})
