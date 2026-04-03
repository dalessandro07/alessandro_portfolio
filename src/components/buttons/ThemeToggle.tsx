import { useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

function getCookie (name: string): Theme | undefined {
	if (typeof document === 'undefined') return

	const value: string = `; ${document.cookie}`
	const parts: string[] = value.split(`; ${name}=`)

	if (parts.length !== 2) return
	const cookieValue = parts.pop()?.split(';').shift()

	if (cookieValue === 'dark') return 'dark'
	if (cookieValue === 'light') return 'light'
	return
}

function DarkIcon () {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-6 h-6 md:w-5 md:h-5 2xl:w-7 2xl:h-7 text-customBlack'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
			/>
		</svg>
	)
}

function LightIcon () {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			stroke='currentColor'
			className='w-8 h-8 md:w-6 md:h-6 2xl:w-8 2xl:h-8'
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
			/>
		</svg>
	)
}

export default function ThemeToggle () {
	const [theme, setTheme] = useState<Theme>(() => {
		const cookieValue = getCookie('themeARPortfolio')
		if (cookieValue) return cookieValue
		return typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'
	})

	const icon = useMemo(() => {
		// Si el tema actual es "dark", mostramos el icono "light" para indicar que el siguiente click
		// cambiará a modo claro (y viceversa).
		return theme === 'dark' ? <LightIcon /> : <DarkIcon />
	}, [theme])

	const onClick = () => {
		if (typeof document === 'undefined') return

		const cookieValue = getCookie('themeARPortfolio')
		const currentDark = document.documentElement.classList.contains('dark')

		const nextTheme: Theme =
			cookieValue === 'dark'
				? 'light'
				: cookieValue === 'light'
					? 'dark'
					: currentDark
						? 'light'
						: 'dark'

		if (nextTheme === 'light') {
			document.documentElement.classList.remove('dark')
			document.documentElement.style.setProperty('color-scheme', 'light')
		} else {
			document.documentElement.classList.add('dark')
			document.documentElement.style.setProperty('color-scheme', 'dark')
		}

		document.cookie = `themeARPortfolio=${nextTheme}; path=/; max-age=31536000`
		setTheme(nextTheme)
	}

	return (
		<button
			type='button'
			className='z-20 flex items-center justify-center transition-all duration-200 rounded-full md:hover:scale-125 changeTheme'
			aria-label='Cambiar tema de la página'
			aria-labelledby='Cambiar tema de la página'
			title='Cambiar tema'
			onClick={onClick}
		>
			<span id='iconTheme' aria-hidden='true'>
				{icon}
			</span>
		</button>
	)
}

