const { join } = require('path')
const vuePlugin = require('@vitejs/plugin-vue')
const { defineConfig } = require('vite')
const userConfig = require('../config')
const AutoImport = require('unplugin-auto-import/vite')
const Icons = require('unplugin-icons/vite')

const IsWeb = process.env.BUILD_TARGET === 'web'

function resolve(dir) {
  return join(__dirname, '..', dir)
}

const root = resolve('src/renderer')

const config = defineConfig({
  mode: process.env.NODE_ENV,
  root,
  define: {
    'process.env':
      process.env.NODE_ENV === 'production'
        ? userConfig.build.env
        : userConfig.dev.env,
    'process.env.IS_WEB': IsWeb,
    'process.env.PORT': userConfig.dev.port,
  },
  resolve: {
    alias: {
      '@renderer': root,
      '~': root,
    },
  },
  base: './',
  build: {
    outDir: IsWeb ? resolve('dist/web') : resolve('dist/electron/renderer'),
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild',
  },
  server: {},
  plugins: [
    vuePlugin({
      script: {
        refSugar: true,
      },
    }),
    AutoImport({
      dts: '../../customTypes/auto-imports.d.ts',
      dirs: ['./store', './hooks/*', './composable/*'],
      imports: ['vue', 'vue-router', '@vueuse/head', '@vueuse/core'],
    }),
    Icons(),
  ],
  optimizeDeps: {},
  publicDir: resolve('static'),
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '~/assets/scss/variables';`,
      },
    },
  },
})

module.exports = config
