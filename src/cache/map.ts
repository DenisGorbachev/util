/**
 * Note: the cache map can contain null and false values, so the function must check that the result is strictly not undefined
 */
export async function getFromCacheMap<Key, Result, Args extends unknown[]>(cache: Map<Key, Result>, key: Key, runner: (key: Key, ...args: Args) => Promise<Result>, ...args: Args): Promise<Result> {
  const result = cache.get(key)
  return result !== undefined ? result : runner(key, ...args)
}
