import main from '~example-vue3-webpack/main.mjs'
import env from '../env.js'

(async function () {
  const { publicPath, browserOutputPath, manifestPath, ssrOutputPath } = env
  await main({
    publicPath, browserOutputPath, manifestPath, ssrOutputPath
  })
})()
