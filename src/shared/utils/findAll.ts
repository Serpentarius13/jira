export const findAll = <T>(
  arr: T[],
  predicate: (value: T, index: number, array: T[]) => boolean
): T[] => {
  const results: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      results.push(arr[i]);
    }
  }
  return results;
};
