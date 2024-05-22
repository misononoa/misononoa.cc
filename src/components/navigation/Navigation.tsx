import React from "react";
import "./Navigation.css";

export interface Props {
	root?: string;
}

export default function Navigation(props: Props) {
	const toggleMenu = (function () {
		const [state, setState] = React.useState(false);
		return {
			isOpen: () => state,
			toggle: () => setState(!state),
		};
	})();

	const isRoot: boolean = props.root === "true";

	const navlinks: Array<JSX.Element> = [
		<a href="/">Home</a>,
		<a href="/articles">Articles</a>,
		<a href="https://msky.misononoa.cc/">Misskey</a>,
		<a href="/about">About_me</a>,
	];

	if (isRoot) {
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
