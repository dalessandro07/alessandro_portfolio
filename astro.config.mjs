import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import path from 'path'

// https://astro.build/config
export default defineConfig({
  site: 'https://alessandrorios.com/',
  integrations: [tailwind(), sitemap(), robotsTxt(), icon(), react()],
  prefetch: true,
  vite: {
    ssr: {
      external: ['svgo']
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  adapter: cloudflare()
})
