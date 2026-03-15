export function getNRandomEntries<K extends string, V>(
  dict: Record<K, V>,
  n: number,
) : Record<K,V> {
  const keys = Object.keys(dict); // always returns string[], so we must use as K beneath
  const totalItems = keys.length;

  if (n >= totalItems) {
    return { ...dict }
  }

  const shuffledKeys = keys.sort(() => 0.5 - Math.random());

  const selectedKeys = shuffledKeys.slice(0, n)

  const result: Record<K,V> = {} as Record<K,V>;
  for (const key of selectedKeys) {
    result[key as K] = dict[key as K]
  }

  return result;
}
