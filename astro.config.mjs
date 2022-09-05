import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://alessandrorios.netlify.app/',
	integrations: [tailwind(), sitemap(), preact()],
	vite: {
		ssr: {
			external: ['svgo']
		}
	}
})

