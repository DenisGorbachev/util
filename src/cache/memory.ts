export type CacheKey = string

export interface CacheEntry<Data> {
  data: Data
  now: Date // should be equal to `project.now` (not equal to datetime of cache entry creation)
}

export async function getData<Data>($cache: { [key: string]: CacheEntry<Data> }, key: string, getter: () => Promise<Data>, now: Date) {
  const result = $cache[key]
  if (result && result.now === now) {
    return result.data
  } else {
    const data = await getter()
    $cache[key] = { data, now }
    return data
  }
}
