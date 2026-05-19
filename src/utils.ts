/**
 * Truncates a string to a maximum length, appending a suffix if truncated.
 *
 * @param text - The input string to potentially truncate.
 * @param maxLength - The maximum allowed length of the returned string (including the suffix).
 * @param suffix - The suffix to append when truncation occurs. Defaults to "...".
 * @returns The original string if its length is <= maxLength, otherwise a truncated
 *          string ending with the suffix whose total length equals maxLength.
 *
 * Behavior notes:
 * - If `text` length is <= `maxLength`, returns `text` unchanged.
 * - If `maxLength` is <= 0, returns an empty string.
 * - If `maxLength` is less than the suffix length, the suffix itself is truncated
 *   to fit within `maxLength` (no body characters are included).
 * - Throws TypeError if `text` is not a string or `suffix` is not a string.
 * - Throws TypeError if `maxLength` is not a finite number.
 */
export function truncate(
  text: string,
  maxLength: number,
  suffix: string = "..."
): string {
  if (typeof text !== "string") {
    throw new TypeError("truncate: 'text' must be a string");
  }
  if (typeof suffix !== "string") {
    throw new TypeError("truncate: 'suffix' must be a string");
  }
  if (typeof maxLength !== "number" || !Number.isFinite(maxLength)) {
    throw new TypeError("truncate: 'maxLength' must be a finite number");
  }

  if (maxLength <= 0) {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  // If suffix alone won't fit, return a truncated suffix.
  if (suffix.length >= maxLength) {
    return suffix.slice(0, maxLength);
  }

  const bodyLength = maxLength - suffix.length;
  return text.slice(0, bodyLength) + suffix;
}
