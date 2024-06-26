import * as Misskey from "misskey-js";
import { type Note, type User } from "misskey-js/entities.js";
import React from "react";
import "./NoteView.css";

export interface Props {
	misskey_origin: string;
	username: string;
}

export default function NoteView({ misskey_origin, username }: Props) {
	// 準備
	const client = new Misskey.api.APIClient({
		origin: misskey_origin,
	});
	const [state, setState] = React.useState(Array<Note>);

	// ノート取得
	const getNote = async (username: string) => {
		const user: User = await client.request("users/show", {
			username,
		});
		const response_notes: Array<Note> = await client.request("users/notes", {
			userId: user.id,
			sinceDate: Date.now() - 86400000, // 1日前までのノートを取ってくる
			limit: 20, // 最大20こ
		});
		setState(response_notes);
	};
	React.useEffect(() => {
		getNote(username);
	}, []);

	// mapするための準備
	// 日時表記
	const pad = (num: number) => String(num).padStart(2, "0");
	const formatDate = (datestr: string) => {
		const date = new Date(datestr);
		return `\
${pad(date.getMonth() + 1)}/${pad(date.getDate())} \
${pad(date.getHours())}:${pad(date.getMinutes())}`;
	};

	// ローディング表示のための判定
	const loaded: boolean =
		state !== null && state !== undefined && state.length > 0;

	const notes = loaded ? (
		state
			.filter((note) => !note.renote) // リノートは通さない
			.slice(0, 5) // 最新の5つだけ
			.map(
				// 組み立て
				(note: Note) => (
					<tr key={note.id}>
						<td valign="top">
							<a className="text" href={`${misskey_origin}/notes/${note.id}`}>
								<div>{note.text}</div>
								<div>{note.files.map((file) => file.url)}</div>
							</a>
							<div className="datetime"> - {formatDate(note.createdAt)}</div>
						</td>
					</tr>
				)
			)
	) : (
		<tr>
			<td>Loading... </td>
		</tr>
	);

	return (
		<div className="noteview">
			{loaded && <div className="title">misononoaのようす</div>}
			<table>
				<tbody>{notes}</tbody>
			</table>
		</div>
	);
}
