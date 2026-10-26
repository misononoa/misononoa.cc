import { TIMEZONE } from "./constants";

export const dateToString = (date: Date, timeZone: string = TIMEZONE) => date.toLocaleString("ja-JP", {
    timeZone
});

export const formatDate = (utime: number | string | Date) => dateToString(new Date(utime));

export const compareDate = (date1: Date, date2: Date) => date1.getTime() - date2.getTime();