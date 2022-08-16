import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite'
import vitePluginWindicss from 'vite-plugin-windicss'
import { VitePWA } from 'vite-plugin-pwa'

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
      }),
      VitePWA({
        manifest: {
          name: 'Read the web! - Make websites readable',
          short_name: 'Read the web!',
          description: 'Make the web more readable and printable by generating clean pdf.',
          theme_color: '#1ebf06',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: 'pwa-maskable-128x128.png',
              sizes: '128x128',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            }
          ]
        }
      })
    ],
    build: {
      minify: isProduction
    }
  }
})
