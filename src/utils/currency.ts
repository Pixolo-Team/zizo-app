/** Function to format currency */
export function formatCurrency(value: number | string) {
  // Check if value is null or undefined
  if (value === null || value === undefined) return "0";

  // Check if value is a string
  const number = typeof value === "string" ? Number(value) : value;

  // Returns the formatted currency
  return new Intl.NumberFormat("en-IN").format(number);
}
