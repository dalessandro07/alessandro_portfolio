/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				customBlack: '#121213',
				customWhite: '#e8e8e8',
				muted: '#8c8c8c',
			},
			fontSize: {
				nav: '15px',
				'7.5xl': '5.25rem',
				'10xl': '9rem',
				'11xl': '10rem',
				'12xl': '12rem'
			},
			fontFamily: {
				inter: 'Inter, sans-serif'
			},
			lineHeight: {
				min: '1.1'
			},
			height: {
				'screen/10': '10vh',
				'screen/20': '20vh',
				'screen/30': '30vh',
				'screen/40': '40vh',
				'screen/50': '50vh',
				'screen/60': '60vh',
				'screen/70': '70vh',
				'screen/80': '80vh',
				'screen/90': '90vh'
			},
			width: {
				'screen/10': '10vw',
				'screen/20': '20vw',
				'screen/30': '30vw',
				'screen/40': '40vw',
				'screen/50': '50vw',
				'screen/60': '60vw',
				'screen/70': '70vw',
				'screen/80': '80vw',
				'screen/90': '90vw'
			},
			screens: {
				xs: '475px',
				...defaultTheme.screens
			},
			backgroundSize: {
				'size-200': '200% 200%'
			},
			backgroundPosition: {
				'pos-0': '0% 0%',
				'pos-100': '100% 100%'
			}
		}
	},
	plugins: [require('daisyui')],
	darkMode: 'class',
	daisyui: {
		theme: []
	}
}
