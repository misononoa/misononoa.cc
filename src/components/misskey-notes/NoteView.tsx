import React from "react";
import * as Misskey from "misskey-js";
import { type Note, type User } from "misskey-js/entities.js";
import "./NoteView.css";

export interface Props {
	origin: string;
	username: string;
}

export default function NoteView(props: Props) {
	// 準備
	const client = new Misskey.api.APIClient({
		origin: props.origin,
	});
	const [state, setState] = React.useState(Array<Note>);

	// ノート取得
	const getNote = async (username: string) => {
		const user: User = await client.request("users/show", {
			username,
		});
		const response_notes: Array<Note> = await client.request("users/notes", {
			userId: user.id,
			limit: 50,
		});
		setState(response_notes);
	};
	React.useEffect(() => {
		getNote(props.username);
	}, []);

	// ノートをフィルタ
	const notes = state.filter(
		(note: Note) => Date.now() - 86400000 < Date.parse(note.createdAt)
	);

	// mapするための準備
	const pad = (num: number) => String(num).padStart(2, "0");
	const formatDate = (datestr: string) => {
		const date = new Date(datestr);
		return `\
		${pad(date.getDate())}日 ${pad(date.getHours())}:${pad(date.getMinutes())}`;
	};

	// ローディング表示のための判定
	const loaded: boolean = notes.length > 0;

	return (
		<div className="noteview">
			{loaded ? <div className="title">misononoaのようす</div> : ""}
			<table>
				<tbody>
					{loaded ? (
						notes.map((note: Note) => {
							return (
								<tr key={note.id}>
									<td valign="top" className="text">
										<div className="datetime">{formatDate(note.createdAt)}</div>
										<a href={`${props.origin}/notes/${note.id}`}>{note.text}</a>
									</td>
								</tr>
							);
						})
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
