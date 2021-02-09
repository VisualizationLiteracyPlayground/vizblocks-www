export function truncateString(stringValue, maxLength) {
  let trimmed = stringValue.substring(
    0,
    Math.min(maxLength, stringValue.length),
  );
  if (stringValue.length > maxLength) {
    trimmed = trimmed.concat('...');
  }
  return trimmed;
}
