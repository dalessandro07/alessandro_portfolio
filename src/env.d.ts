/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

export interface Project {
	name: string;
	description: string;
	url: string;
	src: string[];
	isVideo?: boolean;
	isSecondary?: boolean;
}

declare global {
	export interface Window {
		ScrollReveal: any;
	}
}

export interface IRecommendation {
	id: number
	name: string
	title: string
	message: string
	date: string
	image: Image
}
