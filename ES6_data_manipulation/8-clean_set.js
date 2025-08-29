export default function cleanSet(aSet, startString) {
  if (!(aSet instanceof Set) || typeof startString !== 'string' || startString.length === 0) {
    return '';
  }

  const parts = [];
  aSet.forEach((val) => {
    if (typeof val === 'string' && val.startsWith(startString)) {
      parts.push(val.slice(startString.length));
    }
  });

  return parts.join('-');
}
