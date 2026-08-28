/**
 * Strip ASCII control characters (0-31 and 127) and collapse whitespace
 * before storing or forwarding user input. Implemented via char codes
 * rather than a regex control-character class to keep the logic obvious
 * and avoid any ambiguity in how the range is written.
 */
export function sanitizeText(value: string): string {
  let result = "";
  for (const char of value) {
    const code = char.charCodeAt(0);
    const isControlChar = code <= 31 || code === 127;
    result += isControlChar ? " " : char;
  }
  return result.replace(/\s+/g, " ").trim();
}
