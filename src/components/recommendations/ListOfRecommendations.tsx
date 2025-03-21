import recommendations from "@/data/recommendations"
import { useEffect, useRef } from "react"

import * as Glide from "@glidejs/glide"
import "@glidejs/glide/dist/css/glide.core.min.css"
import "@glidejs/glide/dist/css/glide.theme.min.css"

import type { IRecommendation } from '@/env'

export default function RecommendationsCarousel () {
	const sliderRef = useRef(null)

	useEffect(() => {
		if (sliderRef.current) {
			const glide = new Glide.default(sliderRef.current, {
				type: "carousel",
				perView: 3,
				hoverpause: true,
				autoplay: 10000,
				gap: 6,
				keyboard: true,
				breakpoints: {
					768: {
						perView: 3,
					},
					640: {
						perView: 2,
					},
					480: {
						perView: 1,
					},
				},
			})

			glide.mount()
		}
	}, [])

	return (
		<div className="mx-auto max-w-7xl">
			<div className="glide" ref={sliderRef}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{recommendations.map((recommendation: IRecommendation) => (
							<li
								className="flex flex-col items-start gap-5 p-1.5 glide__slides select-none"
								key={recommendation.id}
							>
								<header className="max-w-screen sm:max-w-screen-xs">
									<img
										src={recommendation.image}
										alt={recommendation.name}
										className="w-12 h-12 mb-4 rounded-full select-none sm:w-16 sm:h-16"
									/>
									<h3 className="text-lg font-bold capitalize select-none text-customBlack dark:text-customWhite">
										{recommendation.name.toLowerCase()}
									</h3>
									<h4 className="text-xs font-medium text-gray-600 dark:text-gray-500 truncate max-w-[420px] sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl pr-36 select-none">
										{recommendation.title}
									</h4>
								</header>

								<section className="w-full mr-12 overflow-hidden h-44 hover:overflow-auto">
									<p className="max-w-[80vw] sm:w-5/6 h-full text-base text-gray-700 dark:text-gray-400 whitespace-pre-wrap select-none">
										{recommendation.message}
									</p>
								</section>

								<footer>
									<p className="text-xs font-semibold text-gray-500 select-none dark:text-gray-400">
										Escrita el {recommendation.date}
									</p>
								</footer>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}
