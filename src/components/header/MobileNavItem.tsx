import type { JSX } from "preact/jsx-runtime";
import type { StateUpdater } from "preact/hooks/src/index";

export default function MobileNavItem({
	setIsActive,
	navText,
	path,
}: {
	setIsActive: StateUpdater<boolean>;
	navText: string;
	path: string;
}): JSX.Element {
	const handleNavigation = () => setIsActive(false);

	return (
		<li
			onClick={handleNavigation}
			class="hover:text-blue-600 transition-all duration-200 text-xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link"
		>
			<a href={path}>{navText}</a>
		</li>
	);
}
