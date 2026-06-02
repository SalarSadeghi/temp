import momentJalali from "moment-jalaali";

export const formatJalaliNumeric = (date: momentJalali.MomentInput) =>
  date ? momentJalali(date).format("jYYYY/jMM/jDD") : "";

export function getTimeFromTimestamp(timestamp: number | string): string {
  try {
    return momentJalali(timestamp).format("HH:mm");
  } catch (error) {
    return "--:--"; // Return fallback value
  }
}

export function combineDateTimeFields({
  time,
  date,
}: {
  time: Date | null;
  date: Date | null;
}): number {
  // Parse the date and time strings

  const datePart = date ? new Date(date) : new Date();
  const timePart = time ? new Date(time) : new Date();
  // Create a new Date combining both
  const combinedDate = new Date(
    datePart.getFullYear(),
    datePart.getMonth(),
    datePart.getDate(),
    timePart.getHours(),
    timePart.getMinutes(),
    timePart.getSeconds(),
    timePart.getMilliseconds()
  );

  // Return as timestamp (milliseconds since epoch)
  return combinedDate.getTime();
}
