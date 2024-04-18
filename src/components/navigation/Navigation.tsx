import React from "react";
import "./Navigation.css";
import { type SVGProps } from "react";

function ExpandButton(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z"
			></path>
		</svg>
	);
}

function ShrinkButton(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"
			></path>
		</svg>
	);
}

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

	return (
		<>
			<div className="toggleButton" onClick={toggleMenu.toggle}>
				{!toggleMenu.isOpen() ? (
					<ExpandButton fontSize={31} />
				) : (
					<ShrinkButton fontSize={31} />
				)}
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
