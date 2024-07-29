import * as Misskey from "misskey-js";
import { type Note, type User } from "misskey-js/entities.js";
import React from "react";
import formatDate from "../../utils/formatDate";
import "./NoteView.css";

export interface Props {
	origin: string;
	username: string;
}

// これはこのコンポーネントでのノートの表示形式を決定している関数だよ
const noteElement = (origin: string, note: Note) => {
	return <tr key={note.id}>
		<td valign="top">
			<a className="text" href={`${origin}/notes/${note.id}`}>
				<div>{note.text}</div>
				<div>{note.files.map((file) => file.url)}</div>
			</a>
			<div className="datetime"> - {formatDate(note.createdAt)}</div>
		</td>
	</tr>
};

export default function NoteView({ origin, username }: Props) {
	// 準備
	const client = new Misskey.api.APIClient({
		origin,
	});
	const [notes, setNotes] = React.useState(new Array<Note>);
	const [loaded, setLoaded] = React.useState(false);

	// ユーザ名から最近のノートを取得する関数
	const getNote = async (username: string) => {
		// ユーザ名からユーザ情報を取得
		const user: User = await client.request("users/show", {
			username,
		});
		// ユーザ情報からIDを使ってノートを取得
		const response_notes: Array<Note> = await client.request("users/notes", {
			userId: user.id,
			sinceDate: Date.now() - (86400000 * 2), // 2日前までのノートを取ってくる
			limit: 20, // 最大20こ
		});
		setNotes(response_notes);
		setLoaded(true); // 読み込み状態を完了にセット
	};

	// 上を呼び出してノートを取得
	React.useEffect(() => {
		getNote(username);
	});


	return (
		<div className="noteview">
			{loaded ?
				(<>
					<div className="title">
						misononoaのようす
					</div>
					<table>
						<tbody>
							{
								notes.length > 0 ? // notesに要素があるときは
									notes
										.filter((note) => !note.renote) // renoteを除外して
										.slice(0, 5) // 最新5こだけ取り出し
										.reverse() // 順番を反転して
										.map((note) => noteElement(origin, note)) : // Elementに整形
									( // notesに要素がないときは
										<tr><td>げんきがないみたい</td></tr> // これを出す
									)
							}
						</tbody>
					</table>
				</>) :
				<div className="loading">Loading...</div>
			}
		</div>
	);
}
