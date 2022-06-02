import { getSupabasePrivate, sb } from '../supabase'
import { Cache } from '../cache'

export async function setData<T>(path: string, data: T) {
  await sb(getSupabasePrivate().storage.from(cacheBucketId).upload(`${cacheFolder}/${path}`, JSON.stringify(data), { upsert: true }))
}

export async function getData<T>(path: string): Promise<T | undefined> {
  try {
    const data = await sb(getSupabasePrivate().storage.from(cacheBucketId).download(`${cacheFolder}/${path}`))
    return JSON.parse(await data.text())
  } catch (error) {
    if (error instanceof Error && error.message === 'The resource was not found') {
      return undefined
    } else {
      throw error
    }
  }
}

export function getSupabaseCache(): Cache {
  return {
    get: getData,
    set: setData,
  }
}

const cacheBucketId = process.env.CACHE_BUCKET_ID ?? 'cache'

/**
 * We can't reuse the old cache after we deploy a new version of the project
 */
const cacheFolder = process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'
