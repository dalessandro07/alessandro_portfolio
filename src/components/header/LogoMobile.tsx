import type { JSX } from "preact/jsx-runtime";

export default function LogoMobile(): JSX.Element {
	return (
		<img
			src="/logo.webp"
			alt="Logo"
			width="56"
			height="56"
			className="w-14 h-14 object-cover"
		/>
	);
}
