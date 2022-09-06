import { useEffect, useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'
import type { StateUpdater } from 'preact/hooks/src/index'

interface Props {
	isActive: boolean
	setIsActive: StateUpdater<boolean>
}

export default function NavToggle({ isActive, setIsActive }: Props): JSX.Element {
	const [isMounted, setIsMounted] = useState(false)

	const handleClick = () => setIsActive(!isActive)

	useEffect(() => setIsMounted(true), [])

	useEffect(() => {
		const menu = document?.querySelector('#mobile-menu')

		if (menu) {
			if (isActive) {
				menu.classList.add('is-active')
				menu.classList.add('opacity-100')
				menu.classList.remove('opacity-0')
				document.body.classList.add('overflow-hidden')
				menu.classList.remove('pointer-events-none')
			} else {
				menu.classList.remove('is-active')
				menu.classList.remove('opacity-100')
				menu.classList.add('opacity-0')
				document.body.classList.remove('overflow-hidden')
				menu.classList.add('pointer-events-none')
			}
		}
	}, [isActive])

	if (!isMounted) return <></>

	return (
		<button
			class="hover:bg-customBlack/30 transition-all duration-200 p-2 rounded-full h-10 w-10 items-center justify-center flex"
			onClick={handleClick}>
			{isActive ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			)}
		</button>
	)
}
