import svelte from '@svitejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import vitePluginWindicss from 'vite-plugin-windicss'

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      // uses enforce: pre
      svelte({
        hot: !isProduction,
        emitCss: true
      }),
      vitePluginWindicss({
        transformCSS: 'pre'
      })
    ],
    build: {
      minify: isProduction
    }
  }
})