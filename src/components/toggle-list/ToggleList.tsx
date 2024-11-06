import React from "react";
import "./ToggleList.css";

export interface Props {
	listname: string;
	strs: Array<string>;
}

export default function ToggleList({ listname, strs }: Props): JSX.Element {
	const toggleButton = (() => {
		const [state, setState] = React.useState(false);
		return {
			isOpen: () => state,
			toggle: () => setState(!state),
		};
	})();

	return (
		<ul className="toggle-list">
			<summary onClick={toggleButton.toggle}>
				{!toggleButton.isOpen() ? <>+{listname}</> : <>-{listname}</>}
			</summary>
			{toggleButton.isOpen() &&
				strs.map((s) => (
					<li className="elements" key={strs.indexOf(s)}>
						{s}
					</li>
				))}
		</ul>
	);
}
