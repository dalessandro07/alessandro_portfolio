import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'

import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import fonts from 'astro-fonts-next'

// https://astro.build/config
export default defineConfig({
	site: 'https://alessandrorios.com/',
	integrations: [
		tailwind(),
		sitemap(),
		preact(),
		robotsTxt(),
		fonts({
			url: [
				'https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700;900&display=swap',
				'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap'
			]
		})
	],
	vite: {
		ssr: {
			external: ['svgo']
		}
	}
})
