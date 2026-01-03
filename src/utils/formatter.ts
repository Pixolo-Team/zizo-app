/** Function to convert value to snake case */
export function toSnakeCase(value: string=""): string {
  return value
    .toLowerCase()
    .replace(/ /g, "_")
    .replace(/[^\w_]/g, "");
}
