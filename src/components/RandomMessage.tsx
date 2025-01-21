import React from "react";

export interface Props {
	messages?: Array<string>;
}

export default function RandomMessage({ messages = [] }: Props): JSX.Element {
	const [text, setText] = React.useState("");
	React.useEffect(() => {
		const index = Math.floor(Math.random() * messages.length);
		setText(messages[index]);
	});
	return <>{text}</>;
}
