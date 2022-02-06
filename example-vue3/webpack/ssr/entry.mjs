// // ref https://v3.vuejs.org/guide/ssr/structure.html#entry-server-js
// // see https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/entry-server.js

export { renderToString } from 'vue/server-renderer'
export { default as createApp } from '~example-vue3/create-app.mjs'
