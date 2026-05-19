/**
 * Capitalizes the first letter of the given text and lowercases the rest.
 *
 * Behavior:
 * - Empty string returns empty string.
 * - Single character returns its uppercase form.
 * - Leading whitespace is preserved; the first alphabetic character is NOT
 *   forced — instead the very first character is uppercased per spec.
 *
 * @param text - The input string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(text: string): string {
  if (typeof text !== "string") {
    throw new TypeError("capitalize: expected a string argument");
  }

  if (text.length === 0) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
