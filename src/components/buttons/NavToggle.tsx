import { useEffect } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import type { StateUpdater } from "preact/hooks/src/index";

import "../../css/hamburguer.css";

interface Props {
	isActive: boolean;
	setIsActive: StateUpdater<boolean>;
}

export default function NavToggle({
	isActive,
	setIsActive,
}: Props): JSX.Element {
	const handleClick = () => setIsActive(!isActive);

	useEffect(() => {
		const menu = document?.querySelector("#mobile-menu");
		const hamburger = document?.querySelector("#hamburger");

		if (menu) {
			if (isActive) {
				hamburger?.classList.add("is-active");
				menu.classList.add("is-active");
				menu.classList.add("opacity-100");
				menu.classList.remove("opacity-0");
				document.body.classList.add("overflow-hidden");
				menu.classList.remove("pointer-events-none");
			} else {
				hamburger?.classList.remove("is-active");
				menu.classList.remove("is-active");
				menu.classList.remove("opacity-100");
				menu.classList.add("opacity-0");
				document.body.classList.remove("overflow-hidden");
				menu.classList.add("pointer-events-none");
			}
		}
	}, [isActive]);

	return (
		<button
			id="hamburger"
			class="hamburger hamburger--spin"
			type="button"
			onClick={handleClick}
			aria-label="Menú"
		>
			<span class="hamburger-box">
				<span class="hamburger-inner"></span>
			</span>
		</button>
	);
}
