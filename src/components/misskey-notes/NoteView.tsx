import React from "react";
import * as Misskey from "misskey-js";
import "./NoteView.css";

export interface Props {
	origin: string;
	username: string;
}

export default function NoteView(props: Props) {
	const client = new Misskey.api.APIClient({
		origin: props.origin,
	});

	const [state, setState] = React.useState([]);
	const getNote = async (username: string) => {
		const userId: string = (
			await client.request("users/show", {
				username,
			})
		).id;
		client
			.request("users/notes", {
				userId,
				limit: 10,
			})
			.then((notes) => setState(notes));
	};
	React.useEffect(() => {
		getNote(props.username);
	}, []);

	const notes = state
		.filter(
			(note) => Date.now() - 86400000 < new Date(note.createdAt).getTime()
		)
		.map((note) => {
			const date = new Date(note.createdAt);
			const formattedDate = `\
${String(date.getHours()).padStart(2, "0")}:\
${String(date.getHours()).padStart(2, "0")}\
`;
			return (
				<tr>
					<td valign="top" className="date">
						{formattedDate}
					</td>
					<td valign="top" className="text">
						<a href={`${props.origin}/notes/${note.id}`}>{note.text}</a>
					</td>
				</tr>
			);
		});

	return (
		<div className="noteview">
			<div className="title">misononoaのようす</div>
			<table>
				<tbody>
					{notes.length > 0 ? (
						notes
					) : (
						<tr>
							<td>Loading...</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
