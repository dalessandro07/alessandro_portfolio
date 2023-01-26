/// <reference types="astro/client" />

export interface Project {
	name: string
	description: string
	url: string
	src: string[]
	isVideo?: boolean
	isSecondary?: boolean
}

declare global {
	export interface Window {
		ScrollReveal: any
	}
}
