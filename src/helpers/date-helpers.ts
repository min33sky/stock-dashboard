export function convertDateToUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export function convertUnixTimestampToDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

// TODO: Update 필요
export function createDate(
  date: number | string | Date,
  days: number,
  weeks: number,
  months: number,
  years: number
) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  newDate.setDate(newDate.getDate() + weeks * 7);
  newDate.setMonth(newDate.getMonth() + months);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}
