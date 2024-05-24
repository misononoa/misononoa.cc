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
		const response_notes = await client.request("users/notes", {
			userId,
			limit: 10,
		});
		setState(response_notes);
	};

	React.useEffect(() => {
		getNote(props.username);
	}, []);

	const padd = (num: number) => String(num).padStart(2, "0");
	const notes = state
		.filter(
			(note) => Date.now() - 86400000 < new Date(note.createdAt).getTime()
		)
		.map((note) => {
			const d = new Date(note.createdAt);
			const formattedDate = `${padd(d.getDate())}日 ${padd(
				d.getHours()
			)}:${padd(d.getMinutes())}`;
			return (
				<tr key={note.id}>
					<td valign="top" className="text">
						<div>{formattedDate}</div>
						<a href={`${props.origin}/notes/${note.id}`}>{note.text}</a>
					</td>
				</tr>
			);
		});

	const loaded: boolean = notes.length > 0;
	return (
		<div className="noteview">
			<div className="title">{loaded ? "misononoaのようす" : "Loading..."}</div>
			<table>
				<tbody>
					{loaded ? (
						notes
					) : (
						<tr>
							<td>Loading... </td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
