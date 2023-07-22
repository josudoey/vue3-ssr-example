import crypto from 'crypto'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'unplugin-vue-components/resolvers'

process.env.BUILD_ID = crypto.randomBytes(8).toString('hex')

export default defineConfig(({ command, ssrBuild }) => ({
  // ref https://vitejs.dev/config/shared-options.html#base
  base: '/',
  plugins: [
    vuePlugin(),
    Components({
      dts: false,
      resolvers: [BootstrapVueNextResolver()]
    })
  ],
  build: {
    assetsDir: '_',
    rollupOptions: {
      output: {
        // ref https://rollupjs.org/configuration-options/#output-dir
        entryFileNames: '_/[hash].js',
        assetFileNames: '_/[hash][extname]',
        chunkFileNames: '_/[hash].js'
      }
    },
    manifest: true,
    minify: false
  }
}))
