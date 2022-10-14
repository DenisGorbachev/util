import { identity } from 'lodash-es'
import { Cage, CageP, uncage, uncageP } from './cage'

export function ensure<Obj, Err>(object: Obj | null | undefined, error?: Cage<Err>) {
  if (object === null || object === undefined) throw uncage(error ?? notFound)
  return object
}

export async function ensureP<Obj, Err>(object: Obj | null | undefined, error?: CageP<Err>) {
  if (object === null || object === undefined) throw await uncageP(error ?? notFound)
  return object
}

export function ensureFind<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: Cage<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw uncage(error ?? get_notFound(filter))
  return object
}

export async function ensureFindP<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: CageP<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw await uncageP(error ?? get_notFound(filter))
  return object
}

export function ensureMapGet<Key, Value>(map: Map<Key, Value>, key: Key) {
  return ensure(map.get(key), new Error(`Can't find key "${key}" in map ${map}`))
}

export function ensureGet<Key extends string | number | symbol, Value>(record: Record<Key, Value>, key: Key) {
  return ensure(record[key], new Error(`Can't find key "${key.toString()}" in record ${record}`))
}

export function ensureEvery<Obj, Err>(objects: Array<Obj | null | undefined>, error?: CageP<Err>) {
  if (!objects.every(identity)) throw uncage(error ?? new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`))
  return objects
}

export const notFound = new Error('Can\'t find object in collection')

export const get_notFound = <Obj>(filter: (object: Obj) => boolean) => new Error('Can\'t find an object in a collection using filter: ' + filter.toString())
