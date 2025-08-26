export default function cleanSet(set, startString) {
  const result = new Set();
  for (const value of set) {
    if (typeof value === 'string' && value.startsWith(startString)) {
      result.add(value);
    }
  }
  return result;
}
