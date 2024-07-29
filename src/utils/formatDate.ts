// 日時表記
const pad = (num: number) => String(num).padStart(2, "0");
export default function(datestr: string): string {
	const date = new Date(datestr);
	return `\
${pad(date.getMonth() + 1)}/${pad(date.getDate())} \
${pad(date.getHours())}:${pad(date.getMinutes())}`;
};