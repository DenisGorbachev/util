export interface Cache {
  get: (key: string) => Promise<unknown | undefined>
  set: (key: string, data: unknown) => Promise<void>
}

export async function fetchCachedData<Data>(cache: Cache, key: string, getData: (cache: Cache) => Promise<Data>, validateData: (data: Data) => Data) {
  /**
   * Potential bug: validateData may throw if the schema changes while cached data stays in the same format
   * Mitigation: refresh the cache after each deploy
   */
  const maybeData = await cache.get(key)
  if (maybeData) {
    return validateData(maybeData as Data /* validation should throw if the type doesn't match */)
  } else {
    return refreshCachedData(cache, key, getData)
  }
}

export async function refreshCachedData<Data>(cache: Cache, key: string, getData: (cache: Cache) => Promise<Data>) {
  const data = await getData(cache)
  await cache.set(key, data)
  return data
}

function shouldRefreshCache(key: string, refreshCacheKeyPrefixes: string[]) {
  return refreshCacheKeyPrefixes.find(p => key.startsWith(p))
}

export function getNoopCache<Data>(): Cache {
  return {
    get: async (key) => undefined,
    set: async (key, data) => undefined,
  }
}

export function getTestCache<Data>(): Cache {
  return {
    get: async (key) => { throw new Error('Tests must not use cache') },
    set: async (key, data) => { throw new Error('Tests must not use cache') },
  }
}

export function toRefreshedCache(cache: Cache): Cache {
  return {
    get: async (key) => undefined, // if get returns undefined, then ensureCachedData will call resetCachedData
    set: cache.set,
  }
}

export function toPartiallyRefreshedCache(cache: Cache, refreshCacheKeyPrefixes: string[]): Cache {
  return {
    get: async (key) => {
      if (shouldRefreshCache(key, refreshCacheKeyPrefixes)) {
        return undefined
      } else {
        return cache.get(key)
      }
    },
    set: cache.set,
  }
}
