import { useState } from 'preact/hooks'
import type { JSX } from 'preact/jsx-runtime'
import ThemeToggle from '../buttons/ThemeToggle'
import NavToggle from '../buttons/NavToggle'

export default function HeaderMobile(): JSX.Element {
	const [isActive, setIsActive] = useState(false)

	const handleNavigation = () => setIsActive(false)

	return (
		<nav class="flex flex-col justify-center md:hidden top-0 pt-4 pb-2 fixed right-0 left-0 px-4 dark:bg-customBlack/60 bg-customWhite/60 backdrop-blur-xl">
			<div class="flex items-center justify-between z-50">
				<a href="/">
					<img
						class="w-8 h-8 rounded-full object-cover"
						src="/favicon.webp"
						alt="Logo de Alessandro Rios"
					/>
				</a>

				<article class="flex gap-6 items-center">
					<ThemeToggle />
					<NavToggle isActive={isActive} setIsActive={setIsActive} />
				</article>
			</div>

			<ul
				id="mobile-menu"
				class="flex opacity-0 transition-all duration-300 ease-in-out flex-col h-screen z-40 fixed inset-0 p-8 bg-customWhite dark:bg-customBlack backdrop-blur-2xl items-center gap-12 grow justify-center">
				<li
					onClick={handleNavigation}
					class="hover:text-blue-600 transition-all duration-200 text-2xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link">
					<a href="/">Inicio</a>
				</li>
				<li
					onClick={handleNavigation}
					class="hover:text-blue-600 transition-all duration-200 text-2xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link">
					<a href="/#proyectos">Proyectos</a>
				</li>
				<li
					onClick={handleNavigation}
					class="hover:text-blue-600 transition-all duration-200 text-2xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link">
					<a href="/recursos">Recursos</a>
				</li>
				<li
					onClick={handleNavigation}
					class="hover:text-blue-600 transition-all duration-200 text-2xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link">
					<a href="/#sobre-mi">Sobre mí</a>
				</li>
				<li
					onClick={handleNavigation}
					class="hover:text-blue-600 transition-all duration-200 text-2xl xs:text-3xl sm:text-4xl text-current font-extrabold menu_link">
					<a href="#contacto">Contacto</a>
				</li>
			</ul>
		</nav>
	)
}
