import React from "react";

export interface Props {
	messages?: Array<string>;
}

export default function Message({ messages }: Props): JSX.Element {
	const [text, setText] = React.useState("");
	React.useEffect(() => {
		const index = Math.floor(Math.random() * (messages.length - 1));
		setText(messages[index]);
	});
	return <p>{text}</p>;
}
