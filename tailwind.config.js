/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				customBlack: '#111111',
				customWhite: '#f0f0f0'
			}
		}
	},
	plugins: []
}

