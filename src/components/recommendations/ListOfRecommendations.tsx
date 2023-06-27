import { recommendations } from "../../data/recommendations.json";
import { useEffect, useRef } from "preact/hooks";

import * as Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

interface Recommendation {
	id: number;
	name: string;
	title: string;
	message: string;
	date: string;
	image: string;
}

export default function RecommendationsCarousel() {
	const sliderRef = useRef(null);

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
			});

			glide.mount();
		}
	}, []);

	return (
		<div className="max-w-7xl mx-auto">
			<div className="glide" ref={sliderRef}>
				<div className="glide__track" data-glide-el="track">
					<ul className="glide__slides">
						{recommendations.map((recommendation: Recommendation) => (
							<li
								className="flex flex-col items-start gap-5 p-1.5 glide__slides select-none"
								key={recommendation.id}
							>
								<header className="max-w-screen sm:max-w-screen-xs">
									<img
										src={recommendation.image}
										alt={recommendation.name}
										className="w-12 sm:w-16 h-12 sm:h-16 rounded-full mb-4 select-none"
									/>
									<h3 className="text-lg select-none font-medium text-customBlack dark:text-customWhite capitalize">
										{recommendation.name.toLowerCase()}
									</h3>
									<h4 className="text-sm font-medium text-gray-500 truncate max-w-[420px] sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl pr-36 select-none">
										{recommendation.title}
									</h4>
								</header>

								<section class="w-full mr-12 h-44 overflow-hidden hover:overflow-auto">
									<p className="max-w-[80vw] sm:w-5/6 h-full text-base text-gray-500 whitespace-pre-wrap select-none">
										{recommendation.message}
									</p>
								</section>

								<footer>
									<p className="text-xs font-medium text-gray-400 select-none">
										{recommendation.date}
									</p>
								</footer>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
