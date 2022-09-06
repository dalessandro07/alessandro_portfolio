import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
	site: 'https://alessandrorios.netlify.app/',
	integrations: [tailwind(), sitemap(), preact(), robotsTxt()],
	vite: {
		ssr: {
			external: ['svgo']
		}
	}
})

