import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

export default function GoTopPage(): JSX.Element {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShow(window.scrollY > 100);
		};

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<a
			href="#top"
			className={`${
				show ? "flex" : "hidden"
			} items-center justify-center fixed w-12 h-12 m-5 bg-customBlack/70 hover:scale-110 hover:bg-customBlack/40 backdrop-blur-lg right-0 bottom-0 transition-all duration-200 border border-gray-500 rounded-full`}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
				></path>
			</svg>
		</a>
	);
}
