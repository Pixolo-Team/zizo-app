/**
 * Formats a date as DD/MM/YYYY.
 */
export function formatDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}/${date.getFullYear()}`;
}

/**
 * Formats a date string (YYYY-MM-DD) into DD Month YYYY
 */
export function formatLongDate(dateString: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  const day = date.getDate();
  const year = date.getFullYear();

  const month = date.toLocaleString("en-US", {
    month: "long",
  });

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
}

/**
 * Returns the ordinal suffix for a day
 * (1st, 2nd, 3rd, 4th...)
 */
function getDaySuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
