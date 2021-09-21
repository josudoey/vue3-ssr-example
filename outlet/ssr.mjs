import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
// ref https://v3.vuejs.org/guide/ssr/structure.html#entry-server-js
// see https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/entry-server.js

import outlet from './index.mjs'

export default function (ctx) {
  const { appId } = ctx
  const app = createSSRApp({
    isServer: true,
    data: () => ({ }),
    setup () {},
    render: function () {
      return h(outlet, {
        id: appId
      })
    }
  })
  return renderToString(app, ctx)
}
