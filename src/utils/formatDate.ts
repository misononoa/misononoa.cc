export default function (d: Date): string {
   return d.toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
   });
}
