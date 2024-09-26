const pad = (num: number) => String(num).padStart(2, "0");
export default function (datestr: string): string {
  return new Date(datestr).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
  });
}
