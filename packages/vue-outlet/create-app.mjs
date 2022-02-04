import { createSSRApp } from 'vue'
import outlet from './index.mjs'

export default function () {
  return createSSRApp(outlet)
}
