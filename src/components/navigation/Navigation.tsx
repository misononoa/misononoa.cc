import React from "react";
import "./Navigation.css";

export interface Props {
	root?: boolean;
}

export interface LinkProps {
	href: string;
	text: string;
}

const linkprops: LinkProps[] = [
	{
		href: "/",
		text: "Home",
	},
	{
		href: "/articles",
		text: "Articles",
	},
	{
		href: "https://msky.misononoa.cc/",
		text: "Misskey",
	},
	{
		href: "/about",
		text: "About_me",
	},
];

export default function Navigation({ root }: Props) {
	const toggleMenu = (function () {
		const [state, setState] = React.useState(false);
		return {
			isOpen: () => state,
			toggle: () => setState(!state),
		};
	})();

	const navlinks: Array<JSX.Element> = linkprops.map((l) => (
		<a key={l.href} href={l.href}>
			{l.text}
		</a>
	));

	if (root) {
		navlinks.reverse();
	}

	return (
		<nav>
			<span className="toggleButton" onClick={toggleMenu.toggle}>
				{!toggleMenu.isOpen() ? <>+ </> : <>- </>}
			</span>
			{navlinks.shift()}
			{toggleMenu.isOpen() && (
				<>
					{navlinks.map((context) => {
						return context;
					})}
				</>
			)}
		</nav>
	);
}
