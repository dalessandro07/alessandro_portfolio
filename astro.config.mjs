import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'


import react from '@astrojs/react'


// https://astro.build/config
export default defineConfig({
  site: 'https://alessandrorios.com/',
  integrations: [tailwind(), sitemap(), robotsTxt(), icon(), react()],
  prefetch: true,
  vite: {
    ssr: {
      external: ['svgo']
    }
  }
})
