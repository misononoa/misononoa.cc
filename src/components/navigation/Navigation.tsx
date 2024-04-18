import React from "react";
import "./Navigation.css";

export interface Props {
	root?: string;
	expandButton?: any;
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

	return (
		<>
			<div className="toggleButton" onClick={toggleMenu.toggle}>
				{props.expandButton}
			</div>
			<div className="nav-links">
				{toggleMenu.isOpen() && (
					<>
						{isRoot ? <a href="/">Home</a> : <a href="/about">About_Me</a>}
						<a href="https://msky.misononoa.cc/">Misskey</a>
					</>
				)}
				<>{isRoot ? <a href="/about">About_Me</a> : <a href="/">Home</a>}</>
			</div>
		</>
	);
}
