import React from "react";

export interface Props {
	messages?: Array<string>;
}

export default function Message(props: Props): JSX.Element {
	const messages: Array<string> = [
		"こんにちは！",
		"トマトが好きです",
		"口の中の皮を噛む癖があります",
		"元気",
	].concat(props.messages);
	const [text, setText] = React.useState("");
	React.useEffect(() => {
		const index = Math.floor(Math.random() * (messages.length - 1));
		setText(messages[index]);
	});
	return <p>{text}</p>;
}
