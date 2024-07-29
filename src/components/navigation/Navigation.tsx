import React from "react";
import "./Navigation.css";

export interface Props {
	current?: string;
}

export interface LinkProps {
	href: string;
	name: string;
	wraptext?: string;
}

const linkprops: LinkProps[] = [
	{
		href: "/",
		name: "misononoa.cc",
		wraptext: "home",
	},
	{
		href: "/about",
		name: "about_me",
	},
	{
		href: "/articles",
		name: "articles",
	},
	{
		href: "https://msky.misononoa.cc/",
		name: "misskey",
	},
];

export default function Navigation({ current }: Props) {
	const toggleButton = (() => {
		const [state, setState] = React.useState(false);
		return {
			isOpen: () => state,
			toggle: () => setState(!state),
		};
	})();

	const navlinks: Array<JSX.Element> = linkprops
		.filter((linkprop) => linkprop.name !== current.toLowerCase())
		.map((l) => (
			<a key={l.href} href={l.href}>
				{(l.wraptext || l.name).toUpperCase()}
			</a>
		));

	return (
		<nav>
			<span className="toggleButton" onClick={toggleButton.toggle}>
				{!toggleButton.isOpen() ? <>+</> : <>-</>}
			</span>
			{navlinks.shift()}
			{toggleButton.isOpen() && (<>{navlinks}</>)}
		</nav>
	);
}
