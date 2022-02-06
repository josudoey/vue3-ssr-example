import { createSSRApp } from 'vue'
import outlet from './outlet/index.mjs'

export default function () {
  return createSSRApp(outlet)
}
