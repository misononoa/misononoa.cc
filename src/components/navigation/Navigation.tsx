import React from "react";
import "./Navigation.css";

export interface Props {
	current?: string;
	links: Array<NavLink>;
}

export type NavLink = {
	href: string;
	name: string;
};

export default function Navigation({ current, links }: Props) {
	const toggleButton = (() => {
		const [state, setState] = React.useState(false);
		return {
			isOpen: () => state,
			toggle: () => setState(!state),
		};
	})();

	const linkele: Array<JSX.Element> = links
		.filter((linkprop) => linkprop.name !== current.toLowerCase())
		.map((l) => (
			<a key={l.href} href={l.href}>
				{l.href === "/" ? "TOP" : l.name.toUpperCase()}
			</a>
		));

	return (
		<nav>
			<span className="toggleButton" onClick={toggleButton.toggle}>
				{!toggleButton.isOpen() ? <>+</> : <>-</>}
			</span>
			{linkele.shift()}
			{toggleButton.isOpen() && <>{linkele}</>}
		</nav>
	);
}
