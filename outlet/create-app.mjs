import { createSSRApp } from 'vue'
import outlet from './index.mjs'

export default function () {
  const app = createSSRApp(outlet)
  return app
}
