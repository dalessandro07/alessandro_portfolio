import { useEffect, useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

export default function ThemeToggle(): JSX.Element {
	const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
	const [isMounted, setIsMounted] = useState(false);

	const handleClick = () => setTheme(theme === "light" ? "dark" : "light");

	useEffect(() => setIsMounted(true), []);

	useEffect(() => {
		if (theme === "dark") document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");

		localStorage.setItem("theme", theme);
	}, [theme]);

	if (!isMounted) return <></>;

	return (
		<button
			class="md:hover:scale-125 transition-all h-8 duration-200 p-2 rounded-full items-center justify-center flex"
			onClick={handleClick}
			aria-label="Cambiar tema"
			title="Cambiar tema"
		>
			{theme === "light" ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 md:w-4 md:h-4 2xl:w-6 2xl:h-6 text-customBlack"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-11 h-11 md:w-6 md:h-6 2xl:w-8 2xl:h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
					/>
				</svg>
			)}
		</button>
	);
}
