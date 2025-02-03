export function paramsToObject(
  entries: URLSearchParamsIterator<[string, string]>
) {
  const result: Record<string, string | string[]> = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tuple
    if (value) {
      result[key] = value.toString();
    }
  }
  return result;
}
