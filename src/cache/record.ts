/**
 * Note: the cache map can contain null and false values, so the function must check that the result is strictly not undefined
 */
export async function getFromCacheRecord<Key, Result, Args extends unknown[]>(cache: Record<string, Result>, key: Key, runner: (key: Key, ...args: Args) => Promise<Result>, ...args: Args): Promise<Result> {
  const result = cache[toKey(key)]
  return result !== undefined ? result : runner(key, ...args)
}

export function toKey(object: unknown) {
  return JSON.stringify(object)
}
